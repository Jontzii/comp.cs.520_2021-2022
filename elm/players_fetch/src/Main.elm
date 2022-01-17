-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list

module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }

listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list

updatePlayerId : List Player -> Player -> Player
updatePlayerId players player =
    case listLast players of
        Nothing ->
            Player player.id player.name player.isActive
        Just lastPlayer ->
            Player (lastPlayer.id + 1) player.name player.isActive
    

initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
      }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        players = model.players
        newPlayer = model.newPlayer
    in
    case msg of
        SetName word ->
            ( { model | newPlayer =
                { id=newPlayer.id
                , name=word
                , isActive=newPlayer.isActive
                }
            }, Cmd.none )

        AddPlayer ->
            ( { model
            | players = List.reverse (newPlayer :: (List.reverse players))
            , newPlayer = initPlayer (newPlayer.id + 1)
            }, Cmd.none )

        DeletePlayer id ->
            ( { model | players = List.filter (\x -> x.id /= id) players }, Cmd.none )

        ModifyPlayer id status ->
            ( { model | players = List.map (\x -> if x.id == id then { x | isActive = status } else x) players }, Cmd.none )

        FetchPlayers data ->
            case data of
                Ok fetchedPlayers ->
                    (
                        { model
                        | reqStatus = ""
                        , players = fetchedPlayers
                        , newPlayer = updatePlayerId fetchedPlayers model.newPlayer
                        }
                        , Cmd.none
                    )
                Err _ ->
                    (
                        { model | reqStatus = "An error has occurred!!!" }
                        , Cmd.none
                    )


-- Render the player form
renderForm : String -> (String -> Msg) -> Msg -> Html Msg
renderForm name setName addPlayer =
    Html.form [ id "submit-player", onSubmit addPlayer ]
        [ input
            [ id "input-player"
            , type_ "text"
            , placeholder "player name"
            , value name
            , onInput setName
            ] []
        , button [ id "btn-add" , type_ "submit" ] [ text "Add" ]
        ]

-- Render single player
renderPlayer : Player -> (Int -> Msg) -> (Int -> Bool -> Msg) -> Html Msg
renderPlayer player delete modify =
    li [ id (String.append "player-" (String.fromInt player.id)) ]
        [ div [ class "player-name" ] [ text player.name ]
        , div []
            [ input
                [ type_ "checkbox"
                , class "player-status"
                , onCheck (\checkValue -> (modify player.id checkValue))
                , checked player.isActive
                ] []
                , text "active"
            ]
        , button
            [ class "btn-delete"
            , onClick (delete player.id)
            ] [ text "Delete" ]
        ]

view : Model -> Html Msg
view model =
    let
        players = model.players
        reqStatus = model.reqStatus
    in
    div []
        [ h3 [] [ text "Add player" ]
        , renderForm model.newPlayer.name SetName AddPlayer
        , h3 [] [ text "Players list" ]
        , ol [ id "players-list" ]
            (List.map (\x -> (renderPlayer x DeletePlayer ModifyPlayer)) players)
        , div [ id "request-status"] [ text reqStatus ]
        ]

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }

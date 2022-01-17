-- Fetch players from backend on load
-- Delete player from backend first then delete player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- modify player from backend first then modify player from frontend on success
-- add player to backend first then add player to frontend on success


module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)
import Json.Encode as Encode


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , baseUrl : String
    , reqStatus : String
    }


type Msg
    = SetName String
    | FetchPlayers (Result Http.Error (List Player))
    | PutPlayerReq Int Bool
    | ModifyPlayer (Result Http.Error Player)
    | PostPlayerReq
    | AddPlayer (Result Http.Error Player)
    | DeletePlayerReq Int
    | DeletePlayer Int (Result Http.Error ())


playerEncoder : Player -> Encode.Value
playerEncoder player =
    Encode.object
        [ ( "id", Encode.int player.id )
        , ( "name", Encode.string player.name )
        , ( "isActive", Encode.bool player.isActive )
        ]


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


postPlayerReq : String -> Player -> Cmd Msg
postPlayerReq url player =
    Http.post
        { url = url
        , expect = Http.expectJson AddPlayer playerDecoder
        , body = Http.jsonBody (playerEncoder player)
        }


deletePlayerReq : String -> Int -> Cmd Msg
deletePlayerReq url id =
    Http.request
        { url = url ++ String.fromInt id
        , expect = Http.expectWhatever (DeletePlayer id)
        , headers = [ Http.header "Accept" "*/*" ]
        , method = "DELETE"
        , body = Http.emptyBody
        , timeout = Nothing
        , tracker = Nothing
        }


putPlayerReq : String -> Player -> Cmd Msg
putPlayerReq url player =
    Http.request
        { url = url ++ String.fromInt player.id
        , expect = Http.expectJson ModifyPlayer playerDecoder
        , headers = [ Http.header "Accept" "*/*" ]
        , method = "PUT"
        , body = Http.jsonBody (playerEncoder player)
        , timeout = Nothing
        , tracker = Nothing
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


initModel : Model
initModel =
    { players = []
    , newPlayer = initPlayer 0
    , baseUrl = "http://localhost:3001/api/players/"
    , reqStatus = "Loading..."
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initModel
    , fetchPlayers initModel.baseUrl
    )


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        players = model.players
        newPlayer = model.newPlayer
        url = model.baseUrl
    in
    case msg of
        SetName word ->
            ( { model | newPlayer =
                { id=newPlayer.id
                , name=word
                , isActive=newPlayer.isActive
                }
            }, Cmd.none )

        FetchPlayers data ->
            case data of
                Ok fetchedPlayers ->
                    (
                        { model
                        | reqStatus = ""
                        , players = fetchedPlayers
                        , newPlayer = updatePlayerId fetchedPlayers newPlayer
                        }
                        , Cmd.none
                    )
                Err _ ->
                    (
                        { model | reqStatus = "An error has occurred!!!" }
                        , Cmd.none
                    )

        PostPlayerReq ->
            ( model, (postPlayerReq url newPlayer) )

        AddPlayer data ->
            case data of
                Ok player ->
                    ( { model
                    | players = List.reverse (player :: (List.reverse players))
                    , newPlayer = initPlayer (player.id + 1)
                    }, Cmd.none )
                Err _ ->
                    ( model, Cmd.none )

        PutPlayerReq id status ->
            let
                playerMaybe = List.head (List.filter (\x -> x.id == id) players)
            in
            case playerMaybe of
                Nothing ->
                    ( model, Cmd.none )
                Just player ->
                    ( model, (putPlayerReq url (Player player.id player.name status)) )

        ModifyPlayer data ->
            case data of
                Ok player ->
                    let
                        id = player.id
                        status = player.isActive
                    in
                    ( { model | players = List.map (\x -> if x.id == id then { x | isActive = status } else x) players }, Cmd.none )
                Err _ ->
                    ( model, Cmd.none )

        DeletePlayerReq id ->
            ( model, (deletePlayerReq url id) )

        DeletePlayer id data ->
            case data of
                Ok _ ->
                    ( { model | players = List.filter (\x -> x.id /= id) players }, Cmd.none )
                Err _ ->
                    ( model, Cmd.none )


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
        , renderForm model.newPlayer.name SetName PostPlayerReq
        , h3 [] [ text "Players list" ]
        , ol [ id "players-list" ] 
            (List.map (\x -> (renderPlayer x DeletePlayerReq PutPlayerReq)) players)
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

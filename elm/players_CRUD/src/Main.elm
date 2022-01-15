module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)

initPlayer : Int -> Player
initPlayer id =
    Player id "" False

-- MODEL

-- Data Model of a player
type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }

-- Data Model of the application
type alias Model =
    { players : List Player
    , newPlayer : Player
    }

type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }

-- UPDATE

update : Msg -> Model -> Model
update msg model =
    let
        players = model.players
        newPlayer = model.newPlayer
    in
    case msg of
        SetName name ->
            { model | newPlayer =
                { id=newPlayer.id
                , name=name
                , isActive=newPlayer.isActive
                }
            }

        AddPlayer ->
            { model
            | players = List.reverse (newPlayer :: (List.reverse players))
            , newPlayer = initPlayer (newPlayer.id + 1)
            }

        DeletePlayer id ->
            { model | players = List.filter (\x -> x.id /= id) players }

        ModifyPlayer id status ->
            { model | players = List.map (\x -> if x.id == id then { x | isActive = status } else x) players }

-- VIEW

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
    in
    div []
        [ h3 [] [ text "Add player" ]
        , renderForm model.newPlayer.name SetName AddPlayer
        , h3 [] [ text "Players list" ]
        , ol 
            [ id "players-list"
            ] (List.map (\x -> (renderPlayer x DeletePlayer ModifyPlayer)) players)
        ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }

module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)

-- Functions

initPlayer : Int -> Player
initPlayer id =
    Player id "" False

-- Sets name of a player to given string
setPlayerName : Player -> String -> Player
setPlayerName player name =
    Player player.id name player.isActive

-- Adds player to list
addPlayerToList : Player -> List Player -> List Player
addPlayerToList player old =
    player :: old

-- Increase counter by one
increaseCounter : Player -> Int
increaseCounter player =
    player.id + 1

-- Remove player from list
removePlayer : List Player -> Int -> List Player
removePlayer lst id =
    List.filter (\x -> x.id /= id) lst

-- Update player active status
modifyPlayer : List Player -> Int -> Bool -> List Player
modifyPlayer lst id status =
    -- Find player with id from list
    -- Modify player active status
    -- Return list with modified player
    List.map (\x -> if x.id == id then { x | isActive = status } else x) lst

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
    case msg of
        SetName name ->
            { model | newPlayer = (setPlayerName model.newPlayer name) }

        AddPlayer ->
            { model
            | players = addPlayerToList model.newPlayer model.players
            , newPlayer = initPlayer (increaseCounter model.newPlayer)
            }

        DeletePlayer id ->
            { model | players = removePlayer model.players id}

        ModifyPlayer id status ->
            { model | players = modifyPlayer model.players id status }

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
    div []
        [ h3 [] [ text "Add player" ]
        , renderForm model.newPlayer.name SetName AddPlayer
        , h3 [] [ text "Players list" ]
        , ol 
            [ id "players-list"
            ] (List.map (\x -> (renderPlayer x DeletePlayer ModifyPlayer)) model.players)
        ]

main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }

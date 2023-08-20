Feature: SpaceBeyond | Account | Log-In and Log-Out

    Background: Precondiciones para iniciar sesión
        Given el usuario está en la página de inicio de sesión


    Scenario Outline: 4844 | TC1: Validar iniciar sesión con datos válidos
        When el usuario ingresa un nombre de usuario as '<username>' y una contraseña as '<password>' existentes en el formulario
        And hace clic en el botón "Log In"
        Then el usuario debe iniciar sesión y moverse a la página de inicio
        And el enlace de inicio de sesión de la barra de navegación debe mostrar '<mensaje>' como bienvenida
        Examples:
            | username | password | mensaje |
            | Admin    | admin123 | Hello   |
            | Adm      | admin123 | Hello   |
            | Admin    | admin    | Hello   |

    # Scenario Outline: 4844 | TC2: Validar NO iniciar sesión con datos inválidos
    #     When el usuario olvidó insertar un nombre de usuario as '<username>' contraseña as '<password>'
    #     And usuario hace clic en el botón "Log In"
    #     Then se debe mostrar un mensaje de registro debajo de la entrada correspondiente como: '<mensaje>' en caso de nombre de usuario as '<username>' vacío '<mensaje>' en caso de contraseña as '<password>' vacía
    #     And el usuario no debe poder iniciar sesión
    #     Examples:
    #         | username | password  | mensaje                       |
    #         |          |           | Name is a required field.     |
    #         |          | admin1234 | Name is a required field.     |
    #         | A        | admin1234 | Name is a required field.     |
    #         | Ad       | admin1234 | Name is a required field.     |
    #         | Adm      |           | Password is a required field. |
    #         | Admin    | a         | Password is a required field. |
    #         | Admin    | ad        | Password is a required field. |
    #         | Admin    | adm       | Password is a required field. |
    #         | Admin    | admi      | Password is a required field. |


    Scenario: 4844 | TC3: Validar cerrar sesión exitosamente
        Given el usuario ya ha iniciado sesión
        When el usuario hace clic en el botón "Log out"
        Then el usuario debe ser desconectado de la sesión inmediatamente

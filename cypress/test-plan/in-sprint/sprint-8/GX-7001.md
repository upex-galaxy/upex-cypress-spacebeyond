# ✅SpaceBeyond | Datepicker | Buscar destino por fecha y grupo de pasajeros

[GX-7001](https://upexgalaxy6.atlassian.net/browse/GX-7001) Created: 17/1/23 Updated: 17/1/23

**COMO** usuario

**QUIERO** seleccionar mi fecha de partida y retorno junto con la cantidad y tipo de pasajero

**PARA** encontrar mi destino
✅ACCEPTANCE CRITERIA
Feature: Destiny Selector

  Background:
    Given: usuario está situado en el home del site "Space&Beyond"
      
  Scenario 01: usuario busca destino por fecha de partida y retorno junto con tipo de pasajero.
    When: hace click sobre el date picker "Departing"
    And: selecciona una fecha de partida
    And: hace click sobre el date picker "Returning"
    And: selecciona una fecha de retorno
    And: hace click sobre el dropdown list "Adults"
    And: selecciona una cantidad de pasajeros adultos
    And: hace click sobre el dropdown list "Children"
    And: selecciona una cantidad de pasajeros niños
    And: hace click sobre el botón "Select Destination"
    Then: la sección "Your next destination" se actualiza con las opciones disponibles para ese conjunto de datos
    
  Scenario 02: usuario busca destino solo por fecha de partida y retorno.
    When: hace click sobre el date picker "Departing"
    And: selecciona una fecha de partida
    And: hace click sobre el date picker "Returning"
    And: selecciona una fecha de retorno
    And: hace click sobre el botón "Select Destination"
    Then: el dropdownlist "Adults" asigna automáticamente un pasajero por defecto
    And: la sección de "Your next destination" se actualiza con las opciones disponibles para esa fecha
      
  Scenario 03: usuario busca destino solo por cantidad y tipo de pasajeros.
    Given: no haya ningun dato seleccionado en los date picker
    When: hace click sobre el dropdown list "Adults"
    And: selecciona una cantidad de pasajeros adultos
    And: hace click sobre el dropdown list "Children"
    And: selecciona una cantidad de pasajeros niños
    And: hace click sobre el botón "Select Destination"
    Then: los date picker "Departing" y "Returning" asignan automáticamente un rango de fecha
    And: la sección "Your next destination" se actualiza con las opciones disponibles para ese grupo
    
  Scenario 04: usuario busca destino por misma fecha de partida y retorno.
    When: hace click sobre el date picker "Departing"
    And: selecciona una fecha de partida
    And: hace click sobre el date picker "Returning"
    And: selecciona la misma fecha para retorno
    And: hace click sobre el botón "Select Destination"
    Then: el date picker "Departing" se modifica automáticamente a una fecha antes de la fecha seleccionada para "Returning"
    And: la sección de "Your next destination" se actualiza con las opciones disponibles para esa fecha`


    🚩BUSINESS RULES SPEC
HOME PAGE: DESTINY SELECTOR

INPUT - DATE PICKER “DEPARTING:

BR: se debe visualizar  el calendario con una rango de días disponibles para elegir la fecha de partida. 

BR: si ésta opción se omite, el sistema la asignará una fecha por defecto.

INPUT - DATE PICKER “RETURNING” :

BR: se debe visualizar el calendario con una rango de días disponibles para elegir la fecha de retorno. 

BR: si ésta opción se omite, el sistema la asignará una fecha por defecto.

INPUT - DROPDOWN LIST “ADULTS”:

BR: se debe visualizar el rango de pasajeros adultos permitidos.

BR: si ésta opción se omite, se colocará por defecto el valor de 1.

INPUT - DROPDOWN LIST “CHILDREN”:

BR: se debe visualizar el rango de pasajeros niños permitidos.

BR: si ésta opción se omite, queda igual y no afecta la busqueda.
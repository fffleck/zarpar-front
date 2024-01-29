# CMA API

## **ESPECIFICACOES**

**To:** `https://auth-pre.cma-cgm.com/as/token.oauth2`
| param | value |
|--|--|
| **client_id** | beapp-karavel |
| **client_secret** | ip0crECVkhkeJlgax8ugAKoAwokyhLmf0lAuDTiF5ZIACfNzRWtC0exr2J89ONDM |
| **grant_type** | client_credentials |
| **scope** | {refer to swagger depending on API} |

**You will get the JWT and the expiration *(5 minutes)*.**

Once JWT obtained, you can call the api with token in Authorization bearer header
**To:** `https://apis-uat.cma-cgm.net/{base_path}/{endpoint_path}`

**Header:** Authorization Bearer *************************************

**Base Paths:** 
 - commercial.shippingdocument.v1
 - operation.trackandtrace.v1
 - pricing.commercial.ddsm.v1
 - pricing.commercial.quotation.v2
 - shipping.shipment.v3
 - shipping.shippingdocument.blcopy.v1

## **MODELAGEM**

Iterar sobre array de resultados ([] -> item)

### API PRICING

- [x] **Frete**

- item.surcharges.matchingSurchargesPerEquipment -> []
    - Filtrar para encontrar o tipo de container:
    equipmentSizeType -> 20ST, 40ST, 40HC
    - equipmentSizeType<Tipo de Container>.matchingCargoSurcharges -> []
        - Para cada item
            - Charge 1: itemMCS.charge.chargeCode == "FRT00"
            - Charge 2: itemMCS.charge.chargeCode == "BAF03"
            - **Frete**: Charge1 + Charge2

- [x] **Armador**
- CMA

### API ROUTINGS
```
https://apis.cma-cgm.net/vesseloperation/route/v2/routings?placeOfLoading=BRSSZ&placeOfDischarge=DEHAM&departureDate=2023-03-30&equipmentType=ST
```
- [x] **Transit Time**
- routingItem.transitTime
  
- [x] **Data Saída** (Eh um array, pegar a menor data, se a quantidade de itens for maior que 1)
- routingItem.routingDetails.pointFrom.departureDateGmt

- [x] **Data Chegada** (Eh um array, pegar a maior data, se a quantidade de itens for maior que 1)
- routingItem.routingDetails.pointTo.arrivalDateGmt

- [x] **Shipment ID (Codigo de Identifiacao)**
- routing[0].routingDetails.transportation.voyage.voyageReference
```
{
    shipment_id: item.quoteLineId,
    tipo_container: freight.containerType,
    id_tipo_container: freight.containerCode,
    porto_embarque: shipment.portFrom.name,
    id_porto_embarque: shipment.portFrom.code,
    porto_descarga: shipment.portTo.name,
    id_porto_descarga: shipment.portTo.code,
    armador: freight.shippingLine,
    id_armador: freight.shippingLine,
    navio: "",
    data_embarque: formataData(data_partida),
    tempo_de_transito: freight.transitTime,
    data_chegada: formataData(data_chegada),
    frete: `$ ${parseFloat(freight.price) - 100}`,
    imagem_link: freight.logo,
}
```

## CMA API

**POST BODY**

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
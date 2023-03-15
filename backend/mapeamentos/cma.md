## CMA API

**POST BODY**

**To:** `https://auth-pre.cma-cgm.com/as/token.oauth2`
| param | value |
|--|--|
| **client_id** | beapp-karavel |
| **client_secret** | 9ML9Di6FbPaWFKIpbHKcmcmeA3LBUozcXgvFi98u64iOHHH1g6wUIQV7J6tThCkQ |
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
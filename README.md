# Scroller2
infinite scroll project for understanding networks fall 2017

# API Routes

**GET**

* /
  * Send all data

```json
{
    "api_status": "ok",
    "data": {
        "state": true,
        "speed": 10,
        "direction": "up"
    }
}
```

* /state
  * If device is on (true) or off (false)

    ```json
    {
    "state": true
    }
    ```
    
* /speed
  * Number that controls scroll rate
  
    ```json
    {
    "speed": 10
    }
    ```
    
* /direction
  * Scroll up the page ("up") or down the page ("down")
  
    ```json
    {
    "direction": "up"
    }
    ```

**POST**

* /submit
  * Update state, speed, direction
  * Should be x-www-form-urlencoded



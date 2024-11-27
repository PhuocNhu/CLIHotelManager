# CLI Hotel Manager

## 1. Brief Solution

This CLI application solves the problem of merging hotel data from multiple suppliers and providing a unified, cleaned dataset based on specified filters. It fetches hotel data from three suppliers, sanitizes and merges the data, and outputs a JSON array of hotels that match the given `hotel_ids` and `destination_ids`.

The application ensures that only the best quality data is preserved during the merging process and adheres to the expected JSON structure.

A bash script `runner` is included for automated execution with positional arguments for filtering.

---

## 2. Ideas

1. **Fetch Data**  
   Retrieve hotel data from three supplier endpoints (`Acme`, `Patagonia`, `Paperflies`).
   
2. **Parse and Normalize Data**  
   - Parse the raw data to a consistent structure (Hotel object).  
   - Handle inconsistencies and combine complementary attributes.

3. **Merge Data**  
   - Match hotels by their `id` and merge their attributes using priority rules to ensure the best data is retained.  
   - Remove duplicates.

4. **Filter Data**  
   - Apply filters for `hotel_ids` and `destination_ids`.  
   - Include hotels that match all provided criteria.

5. **Output**  
   - Return the cleaned and filtered dataset in the expected JSON format.  

---
## 3. How to implement
### Usage Instructions

#### Running the CLI
```bash
./runner "hotel_id_1,hotel_id_2" "destination_id_1,destination_id_2"
```
#### Examples
```bash
./runner "hotel_id_1,hotel_id_2" "destination_id_1"
./runner "none" "destination_id_3"
./runner "hotel_id_1" "none"
```
#### Expected Output
  - The CLI outputs a JSON array of hotels matching the filters:
```bash
[
  {
    "id": "iJhz",
    "destination_id": 5432,
    "name": "Beach Villas Singapore",
    "location": { ... },
    "description": "Surrounded by tropical gardens...",
    ...
  }
]
```

### Runner Script

The `runner` script automates the execution of the CLI. It accepts two arguments (`$1` for `hotel_ids` and `$2` for `destination_ids`) and runs the application:
```bash
#!/bin/bash
ts-node index.ts "$1" "$2"
```

### Key Considerations:
  -  **MVC Model**: The MVC pattern helps organize code by separating concerns, making it easier to maintain, test, and scale applications.
  -  **Error handling**: Handle network errors, malformed responses, and invalid inputs gracefully.
  -  **Scalability**: If there is new suppliers we just need to create new file with same class name and extend that class with `BaseSupplier` inside `suppliers` directory. There is a file to auto read all typescript files of `suppliers` directory and turn into modules.
  -  **Adaptive to data change**: If suppliers change than we just change the `parse` method of those suppliers to fit the `Hotel` class return data.
  -  **Generic Type**: Declaring a generic type for API responses ensures that the returned data conforms to the expected structure. This helps catch type mismatches at compile time rather than runtime and also reusability and scalability.
  -  **Static Methods**: Static methods offer several benefits, particularly in scenarios where utility-like functionality is needed without the need to instantiate a class.
  -  **Constructors**: Using constructors ensures automatic, consistent, and type-safe initialization, encapsulates complex logic, and enhances readability from that enable robust and maintainable code.

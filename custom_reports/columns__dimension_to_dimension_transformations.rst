.. table:: Dimension To Dimension Transformations

    +-----------------------------+------------------------+--------------+-----------+
    |     Transformation Name     |   Transformation ID    | Source Types |Result Type|
    +=============================+========================+==============+===========+
    |Date To Day                  |to_date                 |date, datetime|date       |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Hour        |to_start_of_hour        |datetime      |datetime   |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Week        |to_start_of_week        |date, datetime|date       |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Month       |to_start_of_month       |date, datetime|date       |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Quarter     |to_start_of_quarter     |date, datetime|date       |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Year        |to_start_of_year        |date, datetime|date       |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Hour Of Day          |to_hour_of_day          |datetime      |int        |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Day Of Week          |to_day_of_week          |date, datetime|int        |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Month Number         |to_month_number         |date, datetime|int        |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Minute      |to_start_of_minute      |datetime      |datetime   |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Five Minutes|to_start_of_five_minutes|datetime      |datetime   |
    +-----------------------------+------------------------+--------------+-----------+
    |Date To Start Of Ten Minutes |to_start_of_ten_minutes |datetime      |datetime   |
    +-----------------------------+------------------------+--------------+-----------+
    |Lowercase                    |lower                   |str           |str        |
    +-----------------------------+------------------------+--------------+-----------+
    |URL To Path                  |to_path                 |str           |str        |
    +-----------------------------+------------------------+--------------+-----------+
    |URL To Domain                |to_domain               |str           |str        |
    +-----------------------------+------------------------+--------------+-----------+
    |URL Strip Query String       |strip_qs                |str           |str        |
    +-----------------------------+------------------------+--------------+-----------+

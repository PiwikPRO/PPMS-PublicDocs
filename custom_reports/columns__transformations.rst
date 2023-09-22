.. table:: Dimension To Metric Transformations

    +-------------------+-----------------+------------+-----------+
    |Transformation Name|Transformation ID|Source Types|Result Type|
    +===================+=================+============+===========+
    |Unique Count       |unique_count     |int, str    |int        |
    +-------------------+-----------------+------------+-----------+
    |Min                |min              |float, int  |(as source)|
    +-------------------+-----------------+------------+-----------+
    |Max                |max              |float, int  |(as source)|
    +-------------------+-----------------+------------+-----------+
    |Average            |average          |float, int  |float      |
    +-------------------+-----------------+------------+-----------+
    |Median             |median           |float, int  |(as source)|
    +-------------------+-----------------+------------+-----------+
    |Sum                |sum              |float, int  |(as source)|
    +-------------------+-----------------+------------+-----------+
.. table:: Dimension To Dimension Transformations

    +------------------------+-------------------+--------------+-----------+
    |  Transformation Name   | Transformation ID | Source Types |Result Type|
    +========================+===================+==============+===========+
    |Date To Day             |to_date            |date, datetime|date       |
    +------------------------+-------------------+--------------+-----------+
    |Date To Start Of Hour   |to_start_of_hour   |datetime      |datetime   |
    +------------------------+-------------------+--------------+-----------+
    |Date To Start Of Week   |to_start_of_week   |date, datetime|date       |
    +------------------------+-------------------+--------------+-----------+
    |Date To Start Of Month  |to_start_of_month  |date, datetime|date       |
    +------------------------+-------------------+--------------+-----------+
    |Date To Start Of Quarter|to_start_of_quarter|date, datetime|date       |
    +------------------------+-------------------+--------------+-----------+
    |Date To Start Of Year   |to_start_of_year   |date, datetime|date       |
    +------------------------+-------------------+--------------+-----------+
    |Date To Hour Of Day     |to_hour_of_day     |datetime      |int        |
    +------------------------+-------------------+--------------+-----------+
    |Date To Day Of Week     |to_day_of_week     |date, datetime|int        |
    +------------------------+-------------------+--------------+-----------+
    |Date To Month Number    |to_month_number    |date, datetime|int        |
    +------------------------+-------------------+--------------+-----------+
    |Lowercase               |lower              |str           |str        |
    +------------------------+-------------------+--------------+-----------+
    |URL To Path             |to_path            |str           |str        |
    +------------------------+-------------------+--------------+-----------+
    |URL To Domain           |to_domain          |str           |str        |
    +------------------------+-------------------+--------------+-----------+
    |URL Strip Query String  |strip_qs           |str           |str        |
    +------------------------+-------------------+--------------+-----------+

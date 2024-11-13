The CalendarHeatMap component uses the library "react-calendar" to display a normal calendar , then it´s fed a json file located in the in ./json folder . It then goes to the cell in which the date is similar to the date value in the json object and checks in what range the value in the json file is in and fills the cell with the respective color (darker green for higher values). When you hover over a cell it will also tell you what kind of details that cell has based on the json file , this is achieved by the function handleMouseOver that finds the data for the hovered date by parsing the date in the cell and comparing it to the json. Then we define the tooltip content based on the data found, next we use the setToolTip to set the position and the content displayed. The     const rect = (event.target as HTMLElement).getBoundingClientRect();  returns an object with the elements size and position relative to the viewport which is usefull to define where the tooltip should appear.

The LineChart component uses the library "recharts" to draw a chart based on the json file located in the ./json folder. We start by declaring 3 useStates , those are the variables that i am going to use to construct several parts of the chart. The first one is average ticket price , i calculate the average ticket price by iterating a for loop on the heatmapData value and adding it to let totalValue , then i divide the totalValue by the length of the json file , by doing this i get the average ticket price which i set by       setAvgTicketPrice(parseFloat(avgPrice.toFixed(0))); which returns me this string with no decimal houses. I then subtract the first value of the array to the last one and divide it by the first value, then i multiply the result by 100 , i then get the percentage change of the values over time. To get the name of the months instead of the actual date in the X axis of the chart i use a function that compares the middle number of the date in the format yyyy - mm - dd to an array with all the months and compare the value in the position of the array. At last i use the library component to build the chart as close as it gets to the example given.

The structure of the project is simple. I have a Router in the App.tsx that enables me to go to two routes through two buttons . The heat map page or the linear chart page . I then go into each one of those and materialize the desired component. I fetch the json in each of these component from the json folder previously mentioned. For the styling i use styled-components which enables me to do the styling in page and instance them as "react"-like components.

In terms of running the project you have to clone it from github , enter into the calendar-heatmap folder (cd calendar-heatmap in the console ) then you npm install ( for all the necessary node modules ) then you npm start and it should get you to the App.tsx page .

For testing purposes :
Line chart :
- hover over the dots where there are values in the y and x , if you want to test if it reads the json file , just alter the json file by inputing another entry in the same architecture as the other objects.

Heat map:
- hover over all the cells , the ones that are highlighted will display the information from the json file . If you want to test if it reads the json file , just alter the json file by inputing another entry in the same architecture as the other objects. 

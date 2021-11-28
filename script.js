// Author: Laxminarayan Chandrashekar
// Assumption: API will return 250 movies by default for the purpose of this project
// We are directly hitting the local server and fetching the top 250 movie list automatically. (To avoid setting up of API Key and developer accounts to get it in realtime)
// In case of any variable parameters to be passed to be passed to backend, the following code might need slight changes

//Fetch the JSON to render the chart
d3.json("http://127.0.0.1:5000/imdb", {
    mode: "cors",
    method: "GET"
}).then(data => {


    // Since this is the only chart in the page, have calculated the viewport size, to keep it adaptive to most screen sizes
    const svgWidth = window.innerWidth - 200;
    const svgHeight = window.innerHeight - 200;


    // Define the chart container dimensions and create the svg element
    const radius = 5;
    const padding = 75;
    const container = d3.select("#sp-container")
        .append("svg")
        .attr("id", "sp-svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("x", 0)
        .attr("y", 0);

    // Calculate the min and max ranges for X & Y axes, so that we dont need to manually set their ranges everytime when data changes
    // Y Axis: Number of Votes
    // X Axis: Rating of movie

    const minVotes = d3.min(data, (d) => parseInt(d.Votes.replaceAll(",", "")));
    const maxVotes = d3.max(data, (d) => parseInt(d.Votes.replaceAll(",", "")));
    const minRating = d3.min(data, (d) => parseFloat(d["Rating"]));
    const maxRating = d3.max(data, (d) => parseFloat(d["Rating"]));


    //Set X & Y Scale with the data and its range.
    const xScale = d3.scaleLinear()
        .domain([minRating - 0.1, maxRating + 0.2])
        .range([padding, svgWidth - padding]);

    const yScale = d3.scaleLinear()
        .domain([minVotes - 5000, maxVotes + 5000])
        .range([svgHeight - padding - 2, padding]);

    // Align the X & Y axes into the viewport accordingly and set the ticks on axes
    const xAxis = d3.axisBottom(xScale).ticks(8);

    //For better UX, reformatted the Y labels to show condensed Vote count in 1000 units , instead of full numbers
    const yAxis = d3.axisLeft(yScale).tickFormat((d) => `${d / 1000}K`);


    // Set the X & Y axes labels to let user know what they represent
    container.append("text")
        .attr("transform",
            `translate(${svgWidth / 2} ,` +
            (svgHeight - 10) + ")")
        .style("text-anchor", "middle")
        .text("Rating");

    container.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 + 10)
        .attr("x", 0 - (svgHeight / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Votes (in 1000)");


    // Append X & Y axis in the SVG container
    container.append("g")
        .attr("transform", `translate(0, ${svgHeight - padding})`)
        .attr("id", "x-axis")
        .call(xAxis);

    container.append("g")
        .attr("transform", `translate(${padding}, 0)`)
        .attr("id", "y-axis")
        .call(yAxis);

    // Define the static tooltip container which will be displayed when user hovers over any data point

    const tooltip = d3.select("#tooltip")
        .append("div")
        .attr("id", "tooltip")
        .attr("class", "tooltip")
        .style("display", "none");

    // Set the data points in the chart
    container.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", d => d.Rating)
        .attr("data-yvalue", d => d.Votes)
        // Added an animation effect for better UX
        .transition()
        .delay((d, i) => (i * 1))
        .duration(2000)
        .attr("cx", d => xScale(d.Rating))
        .attr("cy", d => yScale(parseInt(d.Votes.replaceAll(",", ""))))
        .attr("r", radius)
        ;

    // Define the tooltip content to be shown when user hovers on data point in chart and make it invisible on hovering out of the data point
    container.selectAll("circle").on("mouseover", (e, d) => {

        const toolTipText = `Title: ${d.Title}<br />Year: ${d.Year}<br />Rating: ${d.Rating}<br /># of Votes: ${d.Votes}`

        tooltip.transition()
            .duration(200)
            .style("display", "block")
            .attr("opacity", 0.9)
            .attr("height", `${radius} px`)
            .attr("width", `${radius} px`);

        tooltip.html(toolTipText)
            .attr("data-year", d.Rating)
            .style("top", `${e.pageY - (2 * padding)}px`)
            .style("left", `${e.pageX}px`)
    })
        .on("mouseout", () => {
            tooltip.transition()
                .duration(200)
                .style("display", "block");
        })
})

    // Inform user if the data is not received from server
    .catch(error => alert("We encountered some issues while rendering the chart. Please check the README.md file for the steps to run this app"));


    // Future enhancements to do:

    // Resize the chart automatically when the user resizes window (Currently need to reload the window once to render properly)
    // Add further animations to the data points on mouseover
    // Add animations to zoom in / zoom out
    // Refactor mouseover/mouseout functions into separate functions


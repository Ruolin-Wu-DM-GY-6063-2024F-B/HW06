let data = [];
let yearlyData = {};
let years = [];
let spacing;
let seed = 0;

function preload() {
    data = loadTable('Motor-Vehicle-Crashes.csv', 'csv', 'header');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);

    // I have to turn the data into raws unless it does not work(Asked ChatGPT for this)
    data = data.rows;

    for (let row of data) {
        let year = new Date(row.getString("CRASH_DATE")).getFullYear();
        let death = row.getNum("PERSONS_KILLED");

        yearlyData[year] = yearlyData[year] || { totalCrashes: 0, totalDeath: 0 };
        yearlyData[year].totalCrashes++;
        yearlyData[year].totalDeath += death;
    }

    years = Object.keys(yearlyData);
}

function draw() {
    randomSeed(seed);
    background(0); 

    for (let idx = 0; idx < years.length; idx++) {
        let year = years[idx];
        let x = map(idx, 0, years.length, 50, width - 50);
        let y = random(height / 4, height * 3 / 4);

        let totalCrashes = yearlyData[year].totalCrashes;
        let totalDeath = yearlyData[year].totalDeath;

        let deathR = map(totalDeath, 0, Math.max(...Object.values(yearlyData).map(d => d.totalDeath)), 5, windowHeight / 4);
        let crashR = map(totalCrashes, 0, Math.max(...Object.values(yearlyData).map(d => d.totalCrashes)), 10, windowWidth / 2-50);

        let dynamicCrashR = crashR + map(mouseX, 0, width, -50, 50);

        // death
        noStroke();
        colorMode(RGB);
        fill(random(0, 100), 10, 80);
        ellipse(x, y, deathR);

        // crash
        noFill();
        colorMode(HSL);
        stroke(random(0, 360), 100, 50);
        strokeWeight(1);
        ellipse(x, y, dynamicCrashR);

        // year
        fill(255);
        noStroke();
        textSize(14);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(year, x, y - crashR / 2 - 10);
    }
}

function mouseMoved() {
    redraw();
}

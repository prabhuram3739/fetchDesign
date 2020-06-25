/* Function to fetch all the design */
function fetch(url) {
    return new Promise(resolve => {
        setTimeout(() => { 
            console.log(url); 
            resolve(`dummy data for ${url}`)}, 
            Math.random() * 4000
        );
    });
}

/* Function to fetch all the design and calculate the average of the shape colors */
function fetchDesign(id) {
    return Promise.resolve({
      designId: id,
      shapes: [
        { shapeId: 'basic-square', color: { r: 255, g: 255, b: 255 }},
        { shapeId: 'basic-circle', color: { r: 255, g: 255, b: 255 }},
        { shapeId: 'basic-diamond', color: { r: 255, g: 0, b: 0 }},
        { shapeId: 'basic-rectangle', color: { r: 0, g: 255, b: 0 }}
      ]
    })
  }

let data = [], dataAll = [], red= [], green= [], blue=[], avg_r=0, avg_g=0, avg_b=0, id=1;

for(let i=1; i<=10; i++) {
    data.push(fetch('/design/' + i));
    dataAll.push(fetchDesign('/design/' + i));
}

// Promise.all waits until all jobs are resolved
Promise.all(data)
  .then(responses => console.log("Done")
  ).catch((e) => console.log(e));

// Promise.all waits until all jobs are resolved
Promise.all(dataAll)
.then(res => {
    res[0].shapes.forEach ((ele) => {
        avg_r = avg_r + ele.color.r;
        avg_g = avg_g + ele.color.g;
        avg_b = avg_b + ele.color.b;
    });
    avg_r= avg_r / res[0].shapes.length;
    avg_g= avg_g / res[0].shapes.length;
    avg_b= avg_b / res[0].shapes.length;
    
    for(let i=1; i<=10; i++) {
      console.log("Design: " + i , {r: avg_r, g: avg_g, b: avg_b});
    }  
}
).catch((e) => console.log(e));
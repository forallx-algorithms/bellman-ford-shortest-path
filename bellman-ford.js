/*
  Bellman Ford algorithm computes shortest path distance of a weighted directed graph from vertex s to destination v in O(m*n)

  @author Evgeniy Kuznetsov
  @date 26.04.2015
*/

// Bellman Ford algorithm
// @param {Edges} edges
// @param {Vertex} source
// @param {Vertex} destination
// @return {Integer|undefined} Integer - length of a path, undefined - graph has a negative cycle
function bellmanFord(edges, source, destination) {

  var vertices = calculateVertices(edges);
  var verticesNames = Object.keys(vertices);

  // 2D array for collections solutions to subproblems
  var solutions = [];

  var createSolutionEntryIfNot = function(i) {
    if(!solutions[i]) solutions[i] = [];
  }

  // Initialize solutions array
  createSolutionEntryIfNot(0);
  for(var i = 0; i < verticesNames.length; i++) {
    solutions[0][verticesNames[i]] = Infinity;
  }
  solutions[0][source] = 0;

  // Main loop
  // i = 1 because we already calculated for i = 0
  for(var i = 1; i < edges.length; i++) {

    // Throw away unneeded solutions
    delete solutions[i - 2];

    createSolutionEntryIfNot(i);

    for(var j = 0; j < verticesNames.length; j++) {
      var cv = verticesNames[j];

      var currentSolutions = [];

      for(var z = 0; z < vertices[cv].headTo.length; z++) {
        var currentHead = vertices[cv].headTo[z];
        var val = solutions[i - 1][currentHead[0]] + currentHead[1];

        currentSolutions.push(val);
      }

      solutions[i][cv] = Math.min(
        solutions[i - 1][cv],
        Math.min.apply(this, currentSolutions)
      );

    }

  }

  // Negative cycle check
  var nocycle = true;
  var penultimateIteration = solutions[solutions.length - 2];
  var lastIteration = solutions[solutions.length - 1];

  for(var i = 0; i < verticesNames.length; i++) {
    var cv = verticesNames[i];

    if(lastIteration[cv] != penultimateIteration[cv]) {
      nocycle = false;
      break;
    }

  }

  return nocycle ? penultimateIteration[destination] : undefined;
}


// section: Helpers

// Calculate vertices information
// @param {Array} edges
// @return {Object}
function calculateVertices(edges) {
  var r = {};

  var createEntryIfNot = function(vertex) {
    if(!r[vertex]) r[vertex] = {headTo: [], tailTo: []};
  }

  for(var i = 0; i < edges.length; i++) {
    var currentEdge = edges[i];

    createEntryIfNot(currentEdge[0]);
    createEntryIfNot(currentEdge[1]);

    r[currentEdge[0]].tailTo.push([currentEdge[1], currentEdge[2]]);
    r[currentEdge[1]].headTo.push([currentEdge[0], currentEdge[2]]);

  }

  return r;
}


// section: Tests

var edges = [
  [1, 2, 2],
  [1, 3, 4],
  [2, 3, 1],
  [2, 4, 2],
  [3, 5, 4],
  [4, 5, 2]
];

var edgesWithNegCycle = [
  [1, 2, 2],
  [1, 3, 4],
  [2, 3, 1],
  [2, 4, 2],
  [3, 5, 4],
  [4, 5, 2],
  [5, 1, -7]
];

console.log("Case 1:", bellmanFord(edges, 1, 5) == 6, bellmanFord(edges, 1, 5));
console.log("Case 2:", bellmanFord(edgesWithNegCycle, 1, 5) == undefined, bellmanFord(edgesWithNegCycle, 1, 5));
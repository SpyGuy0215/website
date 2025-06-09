export function aStar(start, goal){
    /*
    *  A* algorithm
    *  @param start: the starting point
    *  @param goal: the goal point
    *  @return: the path from start to goal
    *  gCost = the cost of the path from the start to the current node
    *  hCost = the cost of the path from the current node to the goal (heuristic)
    *  fCost = gCost + hCost
    */

    let exploredRegions = [];

    let frontier = [{
        state: start,
        cost: 0,
        estimate: heuristic(start)
    }];

    while(frontier.length > 0){
        // sort by cost
        frontier.sort((a, b) =>{
            return a.estimate - b.estimate;
        })

        let node = frontier.shift(); // choose path w/ the lowest cost
        exploredRegions.push(node);

        // if the node is the goal, return the path
        if(node.state.x === goal.x && node.state.y === goal.y){
            return exploredRegions;
        }

        // generate steps
        let nextSteps = generateNextSteps(node.state);

        for(let i = 0; i < next.length; i++){

        }
    }


}
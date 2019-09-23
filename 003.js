function efficientRoadNetwork(n, roads) {
    const connections = getConnections(n, roads);

    return resolveConnections(connections);
}

function getConnections (numberRoads, roads) {
    const connections = getStructureRoads(numberRoads);
    processRoads(connections, roads);

    return connections;
}

function getStructureRoads (numberRoads) {
    const connections = [];
    for (let index = 0; index < numberRoads; index++) {
        const dataRoads = getNewRoadStructure(numberRoads);

        connections.push(dataRoads);
    }

    return connections;
}

function getNewRoadStructure (numberRoads) {
    return {
        numberConnections: 0,
        connections: [],
        matrix: getMatrixStructure(numberRoads),
    };
}

function getMatrixStructure (numberRoads) {
    const matrix = [];
    for (let indexRoad = 0; indexRoad < numberRoads; indexRoad++) {
        matrix.push(0);
    }

    return matrix;
}

function processRoads (connections, roads) {
    roads.forEach(road => {
        linkRoad(connections, road);
    });
}

function linkRoad (connections, road) {
    connections[road[0]].numberConnections++;
    connections[road[1]].numberConnections++;
    connections[road[0]].matrix[road[1]] = 1;
    connections[road[1]].matrix[road[0]] = 1;
    connections[road[0]].connections.push(road[1]);
    connections[road[1]].connections.push(road[0]);
}

function resolveConnections (connections) {
    // connections.forEach((connection, index) => console.log(`${index} -> `, JSON.stringify(connection.matrix)));
    // connections.forEach((connection, index) => console.log(`${index} -> `, JSON.stringify(connection.connections)));


    for (let indexStart = 0; indexStart < connections.length; indexStart++) {
        const connection = connections[indexStart];

        // connection.matrix.forEach((point, indexEnd) => {
        for (let indexEnd = 0; indexEnd < connection.matrix.length; indexEnd++) {
            const point = connection.matrix[indexEnd];

            if (indexStart != indexEnd && !point) {
                const validConnection = isValidConnection(connection, indexStart, indexEnd, connections);
                console.log(`${indexStart} -> ${indexEnd} = ${validConnection}`);
                if (!validConnection) return false;
            }
        }
            // });
        // });
    }

    // connections.forEach((connection, indexStart) => {
        // connection.matrix.forEach((point, indexEnd) => {
        //  if (indexStart != indexEnd && !point) {
        //      const validConnection = isValidConnection(connection, indexStart, indexEnd, connections);
        //      console.log(`${indexStart} -> ${indexEnd} = ${validConnection}`);
        //      if (!validConnection) return false;
        //  }
        // });
    // });

    return true;
}

function isValidConnection (startPoint, indexStart, indexEnd, connections) {
    // const connectionsCurrent = getConnectionPointPositions(startPoint);
    const connectionsCurrent = startPoint.connections;

    if (!connectionsCurrent.length) return false;

    // console.log(`${indexStart} => ${JSON.stringify(connectionsCurrent)}`);

    return subConnectionsTouchEnd(connectionsCurrent, indexEnd, connections);
}

function getConnectionPointPositions (point) {
    const connections = [];
    
    point.matrix.forEach((connection, index) => {
        // if (connection) return index;
        if (connection) connections.push(index);
    });

    return connections;
}

function subConnectionsTouchEnd (connectionsCurrent, indexEnd, connections) {
    let endTouched = false;
    connectionsCurrent.forEach(connectionPosition => {
        if (connections[connectionPosition].matrix[indexEnd]) endTouched = true;
    });
    // console.log(`sub resolution -> ${indexEnd} = ${endTouched}`, );

    return endTouched;
}

/**
 * Created by steva on 1/20/15.
 */


function route(handle, pathname, response, request) {
    console.log("I am going to route request " + pathname);

//    console.log(" +++ " + handle[pathname]);

    if (typeof handle[pathname] === 'function') {
        handle[pathname](response, request);
    } else {
        console.log("No request handler for " + pathname);

        response.writeHead(404, {"Content-Type":"text/plain"});
        response.write("404 Not Found");
        response.end();

    }

}

exports.route = route;
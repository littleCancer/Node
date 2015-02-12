/**
 * Created by steva on 1/25/15.
 */

var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout;



function readFiles (err, files) {


    console.log('');

    if (!files.length) {
       return console.log("    \033[31m No files to show!\033[39m\n");
//        return console.log(' nema nista ');
    }


//    console.log('   Select which file or directory you want to see\n');

    var stats = [];

    function file(i) {
        var fileName = files[i];
        console.log(i + '   files' + fileName);

        fs.stat(__dirname + '/' + fileName, function (err, stat) {
            stats[stats.length] = stat;
            console.log(i + ' after  files' + fileName);
            if (stat.isDirectory) {
                console.log("     "+i+"    \033[36m" + fileName + "/\033[39m");
            } else {
                console.log("     "+i+"    \033[90m" + fileName + "/\033[39m");
            }
        });

        if (++i == files.length) {
            read();

        } else {
            file(i);
        }
    }

    function read()
    {
        console.log('');
        stdout.write('     \033[33mEnter your choice: \033[39m');
        stdin.resume();
        stdin.setEncoding('utf8');

        stdin.on('data', option);

    }

    function option(data) {
        var filename = files[Number(data)];
        console.log('selected filename ' + filename + ' ' + Number(data));


        if (Number(data) > 6) {
            console.error("Sad cu bacim exception ");
            process.exit(1);
        } else if (!filename) {
            stdout.write('   \033[31mEnter your choice: \033[39m');
        } else {
            stdin.pause();


            var stat = stats[Number(data)];
            console.log(' ****   stats ' + stats + ' stat ' + stat + ' count ' + stats.length);
            if (stat.isDirectory()) {
                fs.readdir(__dirname + '/' + filename, function(err, files){
                    console.log('');
                    console.log('     (' + file.length + ' files)');
                    files.forEach(function(file){
                       console.log('        - ' + file);
                    });
                    console.log('');
                });
            } else {
                fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data) {

                    console.log(' dataas ' + data);
                    console.log('\033[90m' + data.replace(/(.*)/g, '        $1') + '\033[39m');
                });
            }


        }
    }


    file(0);
}

var cwd = process.cwd();
console.log("cueent dict", cwd);
console.log("__dir" + __dirname);
console.log(" -- " + process.argv);
console.log(" slice : --  " + process.argv.slice(2))

process.on('SIGKILL', function() {
    console.log(" utepase me sa signal ");
});

fs.readdir(process.cwd(), readFiles);
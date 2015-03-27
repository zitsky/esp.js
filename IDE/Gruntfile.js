module.exports = function(grunt) {
  var buildPlatforms = parseBuildPlatforms(grunt.option('platforms'));

  var copyFiles=parseBuildPlatformsForCopy(grunt.option('platforms'));

  grunt.initConfig({
    less: {
      dist: {
        files: {
          'resources/app.css': 'less/app.less'
        }
      }
    },
    watch: {
      files: ['less/**/*.less'],
      tasks: ['less'],
      options: {
        livereload: true
      }
    },
    nodewebkit: {
      options: {
        build_dir: './build', // Where the build version of my node-webkit app is saved
       // mac_icns: './resources/ico/app.icns', // Path to the Mac icon file
        platforms:buildPlatforms
      },
      src: ['./resources/**', './fonts/**', './js/**', './node_modules/**', '!./node_modules/grunt*/**', './index.html', './package.json'] // Your node-webkit app './**/*'
    },
    copy: {
      main: {
        files: copyFiles
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-node-webkit-builder');

  grunt.registerTask('css', ['less']);
  grunt.registerTask('default', ['less']);
  grunt.registerTask('nodewkbuild', ['css','nodewebkit', 'copy']);


};

var parseBuildPlatforms = function(argumentPlatform) {
  // this will make it build no platform when the platform option is specified
  // without a value which makes argumentPlatform into a boolean
  var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

  // Do some scrubbing to make it easier to match in the regexes bellow
  inputPlatforms = inputPlatforms.replace("darwin", "mac");
  inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");

  var buildAll = /^all$/.test(inputPlatforms);
  var PlatformsBuild=[];

  if(/mac/.test(inputPlatforms) || buildAll)
      PlatformsBuild.push('mac');

  if(/win/.test(inputPlatforms) || buildAll)
      PlatformsBuild.push('win');

  if(/linux32/.test(inputPlatforms) || buildAll)
      PlatformsBuild.push('linux32');

  if(/linux64/.test(inputPlatforms) || buildAll)
      PlatformsBuild.push('linux64');

  return PlatformsBuild;
}

var parseBuildPlatformsForCopy=function(argumentPlatform)
{

  var returnCopyObject=[];
  var inputPlatforms = argumentPlatform || process.platform + ";" + process.arch;

  // Do some scrubbing to make it easier to match in the regexes bellow
  inputPlatforms = inputPlatforms.replace("darwin", "mac");
  inputPlatforms = inputPlatforms.replace(/;ia|;x|;arm/, "");
  var buildAll = /^all$/.test(inputPlatforms);

  //if(/mac/.test(inputPlatforms) || buildAll)

  if(/win/.test(inputPlatforms) || buildAll)
  {
    var files=["ESP.JS IDE.exe","icudtl.dat","nw.pak"];
    for(var i=0;i<files.length;i++)
    {
        returnCopyObject.push({
          src: 'build/ESP.JS IDE/win64/'+files[i],
          dest: '../release/bin/win64/'+files[i],
          flatten: true
        });

        returnCopyObject.push({
          src: 'build/ESP.JS IDE/win32/'+files[i],
          dest: '../release/bin/win32/'+files[i],
          flatten: true
        });
    }

    
  }

  //if(/linux32/.test(inputPlatforms) || buildAll)
      //PlatformsBuild.push('linux32');

 //// if(/linux64/.test(inputPlatforms) || buildAll)
    //  PlatformsBuild.push('linux64');
    return returnCopyObject;
}
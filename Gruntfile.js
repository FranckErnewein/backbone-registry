module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.initConfig({
    mochaTest: {
      test: {
        src: ['test/**/*_test.js'],
      },
    },
  });

  grunt.registerTask('test', ['mochaTest']);

};

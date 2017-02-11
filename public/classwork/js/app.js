
angular.module("BlogApp", [])
.controller("BlogController",BlogController)

function BlogController($scope) {
  $scope.hello="got from scope";
  $scope.blogPost= [
    {title:"title 1", content:"content 1"},
    {title:"title 2", content:"content 2"}
  ];

  $scope.addPost = addPost;
  $scope.deletePost = deletePost;
  $scope.updatePost = updatePost;
  $scope.update = update;
  var selectedIndex = -1;
  $scope.newBlog = {};

  console.log("Hello from block controller");



  function addPost(newBlog) {
    var newPost = { title:newBlog.title, content:newBlog.content };
    $scope.blogPost.push(newPost);
  };

  function deletePost(newBlog) {
    var index = $scope.blogPost.indexOf(newBlog);
    $scope.blogPost.splice(index, 1);
  };

  function updatePost(blog){
    selectedIndex=$scope.blogPost.indexOf(blog);
    $scope.newBlog.title = blog.title;
    $scope.newBlog.content = blog.content;
  };

  function update(blog) {
    $scope.blogPost[selectedIndex].title = blog.title;
    $scope.blogPost[selectedIndex].content = blog.content;
    $scope.newBlog={};
  }

}

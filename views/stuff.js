<%#
<% post.bookmarkedUsers.forEach(marker=>{ %>
  <% if(userId && post.bookmarked && post.createdBy==marker) {%>
    <i value="<%= userId %>" id="<%= post._id %>" style="position:absolute; cursor:pointer;  right:1.5rem; margin:3px;  color:gold;  "
      class=" bm bookmark<%= post._id %>  fa fa-bookmark"></i>
 <% } %>
 <% }) %>
 <% if(userId && !post.bookmarked) {%>
 <i value="<%= userId %>" id="<%= post._id %>" style="position:absolute; cursor:pointer;  right:1.5rem; margin:3px;    "
   class="bm bookmark<%= post._id %>  fa fa-bookmark"></i>
   <% } %>



%>
<form class="form-inline ml-auto " style="margin:auto;">
  <div class="input-group">
    <input type="text" class="form-control " placeholder="Search User" aria-label="Search" aria-describedby="search">
    <div class="input-group-append">
      <a href="# " class="btn try"><i class="fas fa-search"></i></a>
    </div>
  </div>
</form>
<% postsAll.forEach(post=>{ %>

<% for(var i=0;i<post.comments.length;i=i+1){ %>

<%  if(post.comments[i].author===user.username){ %>
 <div class="col-md-6" style="border:1px solid #987380">
   <h4><b>Title :</b> <%= post.title %></h4>
   <h4><b>Comment :</b> <%= post.comments[i].comment %></h4>
                   </div>
<% } %>
<%  } %>



<% }) %>

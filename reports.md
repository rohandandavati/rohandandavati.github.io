---
layout: default
title: Reports
---
<style type="text/css">

    /*.head {*/
    /*    position: relative;*/
    /*    padding-top: 80px*/
    /*}*/
    .card-title {
        font-size: 18px;
    }
    .card-subtitle {
        font-size: 12px;
    }
    .card {
      /*width: 300px;*/
      height: 450px;
    }

    body {
    padding-top: 90px;
    }
    .read {
      width: 80px;
      margin: 20px;
      float: bottom;
    }
/*    .d-flex > div {*/
/*      margin: 10px;*/
/*    }*/

    .dropdown{
      display: none !important;
    }
    .img {
      padding: 15px;
      object-fit: contain;
width: 100%;
height: 200px;
    }
    
    .crop-text-1 {
  -webkit-line-clamp: 1;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.crop-text-2 {
  -webkit-line-clamp: 3;
  overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

</style>

<div>

      <section class="jumbotron text-center bg-white">
        <div class="container">
          <h1 class="jumbotron-heading">Reports</h1>
          <!--<p class="lead text-muted">Something short and leading about the collection below—its contents, the creator, etc. Make it short and sweet, but not too short so folks don't simply skip over it entirely.</p>-->
          <p>
            <!--<a href="#" class="btn btn-primary my-2">Weekly Reports</a>-->
            <!--<a href="#" class="btn btn-secondary my-2">All</a>-->
            <button class="btn btn-primary my-2" id = "weekly" onclick = "filterUsingCategory('weekly')" >Weekly Reports</button>
            <button class="btn btn-secondary my-2" id = "all" onclick="filterUsingCategory('all')" >All</button>
          </p>
        </div>
      </section>

      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            {% assign id = 0 %}
            {% for report in site.data.reports %} 
            {% assign id = id | plus:1 %}
            <div class="col-md-4" id="{{id}}" >
              <div class="card mb-4 box-shadow">
                <img class="card-img-top img" src="{{ report.image_path }}" alt="{{ report.name }}">
                <div class="card-body">
                  <text class = "card-title crop-text-1 ">{{ report.name }}</text>
                  <text class = "card-subtitle">{{ report.date }}</text>
                  <p class="card-text crop-text-2">{{ report.description }}</p> 
                </div>
                <a href="{{ report.path }}" class="btn btn-outline-primary read " target="_blank">Read</a>
              </div>
            </div>
            {% endfor %}
        </div>
        
      </div>
      
      </div>
      
      
      <script>
      
      
  function filterUsingCategory(selectedCategory) {
  function getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
  }
  var id = 0
  {% for report in site.data.reports %}
    var date = moment("{{ report.date }}", 'MMMM Do, YYYY').valueOf();
    var weekStart = (getMonday(new Date())).getTime();
    var postDiv = document.getElementById(++id);
    postDiv.style.display =
        (selectedCategory == 'all' || weekStart <= date ) 
          ? 'unset' 
          : 'none';
    {% endfor %}
    
  }
</script>



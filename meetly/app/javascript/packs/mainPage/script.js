$('a[href*=#]').click(function() {
    return false;
});


var animationEndEvent = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
var count = 1;

var Person = {
    wrap: $('#people'),
    people: $('#posts').data('posts'),

    add: function() {
      console.log(this.people);
        for (let i = this.people.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.people[i], this.people[j]] = [this.people[j], this.people[i]];
        }
        var random = this.people;

        for (let k = 0; k < this.people.length; k++) {
            this.wrap.append("<div class='person' data-id='" + random[k].id + "'><strong class='word-break' id = 'mainlyrics'>" + random[k].lyrics + "</strong></div>");
        }
    }
}

var App = {
    yesButton: $('.button.yes .trigger'),
    noButton: $('.button.no .trigger'),
    blocked: false,
    add: function(data) {
      console.log(data);
        for (let i = data.length - 1; i >= 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [data[i], data[j]] = [data[j], data[i]];
        }
        var random = data;

        for (let k = 0; k < data.length; k++) {
            Person.wrap.append("<div class='person' data-id='" + random[k].id + "'><strong class='word-break' id = 'mainlyrics'>" + random[k].lyrics + "</strong></div>");
        }
        Person.people = data;
    },
    like: function(liked) {
        //console.log(count);
        if (count == Person.people.length){
          $.ajax({
            type: "get",
            url: "/"
          }).done(function(data) {
                                  //console.log(count);
              console.log(data);
              if (!this.blocked && liked == true){
                this.blocked = true;

                //console.log(data);
                for(let i = 0; i < Person.people.length; i++){
                  console.log(data[i]);
                  if(data[i].id==Person.people[Person.people.length-1].id){
                      console.log("oke");
                      data.splice( i, 1 );
                      break;
                      //console.log(data);
                  }
                }

              }
              var animate = liked ? 'animateYes' : 'animateNo';
              var self = this;
              App.add(data);




            }).fail(function(errorThrown) {
              console.log(errorThrown);
              alert('error');
            });

          count = 0;
        }
        var animate = liked ? 'animateYes' : 'animateNo';
        var self = this;
        // Person.add();
        if (!this.blocked && liked == true) { //ハートを押されたとき
            this.blocked = true;
            $('.person').eq(0).addClass(animate).one(animationEndEvent, function() {
                console.log($(this).data('id')); //ここのthisは $('.person').eq(0) のこと
                var jqxhr = $.post("/like", { post_id: $(this).data('id') })
                    .done(function() {
                        // alert("second success");
                    })
                    .fail(function() {
                        alert("error");
                    })
                    .always(function() {
                        // alert("finished");

                    });
                $(this).remove();
                if(self.blocked){
                  count = count + 1;
                }
                self.blocked = false;

            });
        } else if (liked == false) { //バツを押されたとき
            this.blocked = true;
            $('.person').eq(0).addClass(animate).one(animationEndEvent, function() {
                $(this).remove();
                if(self.blocked){
                  count = count + 1;
                }
                self.blocked = false;
            });
        }
    }
};

App.yesButton.on('mousedown', function() {
    App.like(true);
});

App.noButton.on('mousedown', function() {
    App.like(false);
});

$(document).ready(function() {

    Person.add();

});

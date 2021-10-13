$('a[href*=#]').click(function() {
    return false;
});


var animationEndEvent = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";

var Person = {
    wrap: $('#people'),
    people: $('#posts').data('posts'),
    add: function() {
        var random = this.people[Math.floor(Math.random() * this.people.length)];
        this.wrap.append("<div class='person' data-id='" + random.id + "'><strong>" + random.lyrics + "</strong></div>");
    }
}

var App = {
    yesButton: $('.button.yes .trigger'),
    noButton: $('.button.no .trigger'),
    blocked: false,
    like: function(liked) {
        var animate = liked ? 'animateYes' : 'animateNo';
        var self = this;
        Person.add();
        if (!this.blocked && liked == true) {
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
                self.blocked = false;
            });
        } else if (liked == false) {
            this.blocked = true;
            $('.person').eq(0).addClass(animate).one(animationEndEvent, function() {
                $(this).remove();
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
    Person.people.forEach(function(person) {
        src = person.lyrics;
    });

    Person.add();
    Person.add();
    Person.add();
    Person.add();
});
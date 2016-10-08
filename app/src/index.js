Vue.component('todo', {
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
});

var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!'
    }
});

var app2 = new Vue({
    el: '#app-2',
    data: {
        id: 'inspect me'
    },

});

var app3 = new Vue({
    el: '#app-3',
    data: {
        seen: true
    }
});

var app4 = new Vue({
    el: '#app-4',
    data: {
        todos: [{
            text: 'Learn HTML && CSS '
        }, {
            text: 'Learn JavaScript '
        }, {
            text: 'Learn Vue '
        }]
    }
});

var app5 = new Vue({
    el: '#app-5',
    data: {
        message: 'input handling',
    },
    methods: {
        reverseMessage: function() {
            this.message = this.message.split('').reverse().join('');
        }
    }
});

var app6 = new Vue({
    el: '#app-6',
    data: {
        message: 'Hello Vue'
    },
    beforeCreate: function () {
        console.log('before vue instance create');
    },
    created: function () {
        console.log(this);
    },
    beforeMount: function () {
        console.log('vue instance before mounted');
    },
    mounted: function () {
        console.log('vue instance mounted');
    },
    beforeUpdate: function () {
        console.log('data change...');
    },
    updated: function () {
        console.log('change happened');
    }
});

var app7 = new Vue({
    el: '#app-7',
    data: {
        url: false
    }
});

var app8 = new Vue({
    el: '#app-8',
    data: {
        message: 'Shriting'
    },
    computed: {
        reverseMessage: function () {
            return this.message.split('').reverse().join('');
        },
        nowComputed: function () {
            return Date.now();
        }
    },
    methods: {
        nowMethod: function () {
            return Date.now();
        }
    }
});

var app9 = new Vue({
    el: '#app-9',
    data: {
        firstName: 'tab',
        lastName: 'ivan',
        fullName: 'tab ivan'
    },
    watch: {
        firstName: function(value) {
            this.fullName = value + this.lastName;
        },
        lastName: function (value) {
            this.fullName = this.firstName + ' ' + value;
        }
    }
});

var app10 = new Vue({
    el: '#app-10',
    data: {
        firstName: 'tab',
        lastName: 'ivan'
    },
    computed: {
        fullName: function () {
            return this.firstName + ' ' + this.lastName;
        }
    }
});

var app11 = new Vue({
    el: '#app-11',
    data: {
        firstName: 'shirting',
        lastName: 'Xie'
    },
    computed: {
        fullName: {
            get: function () {
                return this.firstName + ' ' + this.lastName;
            },
            set: function (value) {
                var names = value.split(' ');
                this.firstName = names[0];
                this.lastName = names[names.length - 1];
            }
        }
    }
});

var watchVM = new Vue({
    el: '#watch',
    data: {
        question: '',
        imageUrl:'',
        answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
        question: function (newQuestion) {
            this.answer = 'Waiting for you to stop typing...';
            this.getAnswer();
        }
    },
    methods: {
        getAnswer: _.debounce(
            function () {
                var vm = this;
                if (this.question.indexOf('?') === -1) {
                    vm.answer = 'Questions usually contain a question mark. ;-)';
                    return;
                }

                vm.answer = 'Thinking...';
                axios.get('https://yesno.wtf/api')
                     .then(function (response) {
                         vm.answer = _.capitalize(response.data.answer)
                         vm.imageUrl = response.data.image;
                     })
                     .catch(function (error) {
                         vm.answer = 'Error! Could not reach the API.' + error;
                     })
            },
            500
        )
    }
});

// var app12 = new Vue({
//     el: '#app-12',
//     data: {
//         isActive: true,
//         error: null
//     },
//     computed: {
//         classObject: function () {
//             return {
//                 active: this.isActive && !this.error,
//                 'text-danger': this.error && this.error.type === 'fatal'
//             }
//         }
//     }
// });

var app13 = new Vue({
    el: '#app-13',
    data: {
        styleObject: {
            color: 'orange',
            fontSize: '20px',
            transform: 'rotate(30deg)'
        }
    }
});

var vfor = new Vue({
    el: '#v-for',
    data: {
        parentMessage: 'parent',
        items: [
            {message: 'yoyo'},
            {message: 'hahah'},
            {message: 'lolo'}
        ]
    }
});

var vforObj = new Vue({
    el: '#v-for-object',
    data: {
        object: {
            FirstName: 'john',
            LastName: 'Doe',
            Age: 30
        }
    }
});

var vforRange = new Vue({
    el: '#v-for-Range',
});

var listenEvent = new Vue({
    el: '#listenE',
    data: {
        counter: 0
    }
});

var methodE = new Vue({
    el: '#methodE',
    data: {
        name: 'Vue.js'
    },
    methods: {
        greet: function (event) {
            console.log('Hello ' + this.name );
            console.log(event);
        }
    }
});

// var methodWithE = new Vue({
//     el: '#methodWithE',
//     methods: {
//         warn: function (message, event) {
//             if (event) event.preventDefault();
//             console.log(message);
//         }
//     }
// });
var multiple = new Vue({
    el: '#multiple',
    data: {
        message: ''
    }
});

var checkbox = new Vue({
    el: '#checkedbox',
    data:{
        checked: false
    }
});

var checkNames = new Vue({
    el: '#checkedNames',
    data: {
        checkNames: []
    }
});

var radioCheck = new Vue({
    el: '#radioCheck',
    data: {
        picked: ''
    }
});

var selectValue = new Vue({
    el: '#selectValue',
    data: {
        selected: ''
    }
});

var selectMValue = new Vue({
    el: '#selectMValue',
    data: {
        selected: []
    }
});

var selectWithLoop = new Vue({
    el: '#selectWithLoop',
    data: {
        selected: 'A',
        options: [
            { text: 'One', value: 'A'},
            { text: 'Two', value: 'B'},
            { text: 'Three', value: 'C'},
            { text: 'Four', value: 'D'},
            { text: 'Five', value: 'E'},
        ]
    }
});

var dynamicBind = new Vue({
    el: '#dynamicBind',
    data: {
        toggle: '',
        pick: '',
        selected: '',
    }
});

//register
Vue.component('story', {
  template: '#story-template',
  props: ['story', 'favorite'],
  methods: {
    upvote: function () {
      this.story.upvotes += 1;
      this.story.voted = true;
    },
    setFavorite: function () {
      this.favorite = this.story;
    }
  },
  computed: {
    isFavorite: function () {
      return this.story === this.favorite;
    }
  }
});

var leanpubApp = new Vue({
  el: '#leanpub-app',
  data: {
    stories: [
      {
        plot: 'My horse is amazing!',
        writer: 'Mr.tab',
        upvotes: 12,
        voted: false
      },
      {
        plot: 'His borse is cute!',
        writer: 'Miss.Li',
        upvotes: 10,
        voted: false
      },
      {
        plot: 'Wooh, Vue.js is Cool!',
        writer: 'Mr.Evan You',
        upvotes: 4,
        voted: false
      }
    ],
    favorite: {}
  }
});

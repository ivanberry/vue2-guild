var classBind = new Vue({
  el: 'section',
  data: {
    bgColor: {
      backgroundColor: 'lightblue'
    }
  }
});

var actionBind = new Vue({
  el: '#actionBind',
  data: {
    tasks: [
      {
        body: 'Feed the horse', done: true
      },
      {
        body: 'Wash the armor', done: true
      },
      {
        body: 'Sharp sword', done: false
      }
    ],
    styleObject: {
      color: 'red'
    }
  },
  methods: {
    completeTask: function (task) {
      task.done = !task.done
    }
  }
});

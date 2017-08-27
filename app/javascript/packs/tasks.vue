<template>
  <div class="row">
    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
      <h1>My Tasks</h1>
      <h4>{{ text_header }} Task</h4>
      <div class="input-group" :class="{'has-error': errors.has('title') }">
        <input v-model="task.title" v-validate="'required'" type="text" name="title" class="form-control">
        <span class="input-group-btn">
          <button v-if="editButton == false" @click="createTask()" type="submit" class="btn btn-primary">New Task</button>
          <button v-else @click="updateTask()" type="submit" class="btn btn-primary">Update Task</button>
        </span>
      </div>
      <p class="text-danger" v-show="errors.has('title')">{{ errors.first('title') }}</p>
      <hr>
      <h4>All Tasks</h4>
      <ul class="list-group">
        <li v-if='list.length === 0'>There are no tasks yet!</li>
        <li class="list-group-item" v-for="(task, index) in list" v-bind:class="{ 'active': taskIsDone(task) }">
          <p :id="task.id">{{ task.title }}</p>
          <button @click="setEditMode(task.id)" class="btn btn-info btn-xs"><span class="glyphicon glyphicon-pencil"></span></button>
          <button @click="deactiveTask(task.id)" v-if="taskIsDone(task)" class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span></button>
          <button @click="doneTask(task.id)" v-else class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok"></span></button>
          <button @click="deleteTask(task.id)" class="btn btn-danger btn-xs pull-right"><span class="glyphicon glyphicon-trash"></span></button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      task: {
        id: '',
        title: ''
      },
      editButton: false,
      text_header: 'New'
    };
  },

  created() {
    this.fetchTaskList();
  },

  methods: {
    taskIsDone : function (list) {
      return list.status === true;
    },

    setEditMode(id) {
      this.$http.get('/tasks/' + id + '.json').then(response => {
        this.task.title = response.data.title;
        this.task.id = response.data.id;
        this.text_header = 'Update';
        this.editButton = true;
      }, response => {
        console.log("Error");
      });
    },

    fetchTaskList() {
      this.$http.get('/tasks.json').then(response => {
        this.list = response.data;
      }, response => {
        console.log("Error");
      });
    },

    createTask() {
      this.$validator.validateAll().then((success) => {
        if (! success) {
          return;
        }
        this.$http.post('/tasks', this.task).then(response => {
          this.task.title = '';
          this.fetchTaskList();
        }, response => {
          console.log("Error Create Task");
        }).then(() => {
          this.errors.clear();
        });
      });
    },

    updateTask() {
      this.$validator.validateAll().then((success) => {
        if (! success) {
          return;
        }
        this.$http.put('/tasks/' + this.task.id, {title: this.task.title}).then(response => {
          this.editButton = false;
          this.task.title = '';
          this.task.id = '';
          this.text_header = 'New';
          this.fetchTaskList();
        }, response => {
          console.log("Error Update Task");
        }).then(() => {
          this.errors.clear();
        });
      });
    },

    doneTask(id) {
      this.$http.put('/tasks/' + id, {status: 'true'}).then(response => {
        this.fetchTaskList();
      }, response => {
        console.log("Error Done Task");
      });
    },

    deactiveTask(id) {
      this.$http.put('/tasks/' + id, {status: 'false'}).then(response => {
        this.fetchTaskList();
      }, response => {
        console.log("Error Done Task");
      });
    },

    deleteTask(id) {
      this.$http.delete('/tasks/' + id).then(response => {
        this.fetchTaskList();
      }, response => {
        console.log("Error Delete Task");
      });
    },
  }
}
</script>

<style scoped>
p {
  font-size: 3em;
  text-align: center;
}
</style>

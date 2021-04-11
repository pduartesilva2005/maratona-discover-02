const express = require('express');

const routes = express.Router();

const views = __dirname + '/views/';

const Profile = {
  data: {
    name: 'Pedro Duarte',
    avatar: 'https://avatars.githubusercontent.com/u/59842901?v=4',
    'monthly-budget': 3000,
    'days-per-week': 5,
    'hours-per-day': 5,
    'vacation-per-year': 4,
    'value-hour': 75
  },

  controllers: {
    index(request, response) {
      return response.render(views + 'profile', { profile: Profile.data });
    },

    update(request, response) {
      const data = request.body;

      const weeksPerYear = 52;

      const weeksPerMonth = (weeksPerYear - data['vacation-per-year']) / 12;

      const weekTotalHours = data['hours-per-day'] * data['days-per-week'];

      const monthlyTotalHours = weekTotalHours * weeksPerMonth;
    },
  },
};

const Job = {
  data: [
    {
      id: 1,
      name: 'Pizzaria Guloso',
      'daily-hours': 2,
      'total-hours': 1,
      created_at: Date.now()
    },
    {
      id: 2,
      name: 'OneTwo Project',
      'daily-hours': 3,
      'total-hours': 47,
      created_at: Date.now()
    },
  ],
  
  controllers: {
    index(request, response) {
      const updatedJobs = Job.data.map(job => {
        const remaining = Job.services.remainingDays(job);
        const status = remaining <= 0 ? 'done' : 'progress';
    
        return {
          ...job,
          remaining,
          status,
          budget: Profile.data['value-hour'] * job['total-hours']
        };
      });
    
      return response.render(views + 'index', { jobs: updatedJobs });
    },

    create(request, response) {
      return response.render(views + 'job');
    },

    save(request, response) {
      // Criar o último id se ele não existisse
      const lastId = Job.data[Job.data.length - 1] ? Job.data[Job.data.length - 1].id : 1;

      Job.data.push({
        id: lastId + 1,
        name: request.body.name,
        'daily-hours': request.body['daily-hours'],
        'total-hours': request.body['total-hours'],
        created_at: Date.now()
      });

      return response.redirect('/');
    }
  },

  services: {
    remainingDays(job) {
      const remainingDays = (job['total-hours'] / job["daily-hours"]).toFixed();
    
      const createdDate = new Date(job.created_at);
      const dueDay = createdDate.getDate() + Number(remainingDays);
      const dueDateInMs = createdDate.setDate(dueDay);
    
      const timeDiffInMs = dueDateInMs - Date.now();
    
      const dayInMs = 1000 * 60 * 60 * 24;
      const dayDiff = Math.floor((timeDiffInMs / dayInMs));
    
      return dayDiff;
    }
  }
};

routes.get('/', Job.controllers.index);
routes.get('/job', Job.controllers.create);
routes.post('/job', Job.controllers.save);
routes.get('/job/edit', (request, response) => {
  return response.render(views + 'job-edit');
});
routes.get('/profile', Profile.controllers.index);
routes.post('/profile', Profile.controllers.update);

module.exports = routes;
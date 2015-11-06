var app, brands, doc, projects, run, builtBrandName,
    express = require('express'),
    fs = require('fs'),
    gulp = require('gulp'),
    multer = require('multer'),
    nosql = require('nosql'),
    open = require('open'),
    port = 3000,
    swig = require('swig'),
    url = require('url'),
    yaml = require('js-yaml');

// Load projects YAML file
try {
  projects = yaml.safeLoad(fs.readFileSync(__dirname + '/projects.yml', 'utf8'));
} catch (e) {
  console.log(e);
}

// Load brands DB
brands = nosql.load('./brands.nosql');

// Load gulp tasks
// require('./tasks')(brands);
run = require('./tasks');

// Create Express server
app = express();

// Include and config Swig templates
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);

// Include and config form parser and file uploader
app.use(multer({ dest: './uploads/'}));

// Serve static files
app.use(express.static(__dirname + '/public'));
app.use(express.static('uploads'));

// Routes
app.get('/', function(req, res) {
  res.render('index', {
    projects: projects
  });
});

// Project page, list brands
app.get('/:project_id', function(req, res) {
  brands.all(function(brand) {
    if (brand.project_id === req.params.project_id) {
      return brand;
    }
  }, function(projectBrands) {
    var brand_name = builtBrandName;
    builtBrandName = null;

    res.render('project', {
      project_id: req.params.project_id,
      project: projects[req.params.project_id],
      brands: projectBrands,
      builtBrandName: brand_name
    });
  });
});

// New brand form
app.get('/:project_id/new-brand', function(req, res) {
  res.render('new-brand', {
    project_id: req.params.project_id,
    project: projects[req.params.project_id]
  });
});

// Create brand
// Redirect to project page
app.post('/:project_id/new-brand', function(req, res) {
  var brand = req.body,
      file,
      project;

  brand.project_id = req.params.project_id;
  if (brand.vars.html && req.files) {
    for (element_id in brand.vars.html) {
      element = brand.vars.html[element_id];
      file = req.files['vars[html][' + element_id + '][src]'];
      if (file) {
        element['src'] = file.name;
      }
    }
  }

  brands.insert(brand);
  res.redirect('/' + req.params.project_id);
});

// Brand edit form
app.get('/:project_id/:brand_name', function(req, res) {
  brands.one(function(brand) {
    if (brand.project_id === req.params.project_id && brand.name === req.params.brand_name) {
      return brand;
    }
  }, function(brand) {
    res.render('edit-brand', {
      project_id: req.params.project_id,
      project: projects[req.params.project_id],
      brand: brand
    });
  });
});

// Update brand
// Redirect to project page
app.post('/:project_id/:brand_name', function(req, res) {
  brands.update(function(brand) {
    if (brand.project_id === req.params.project_id && brand.name === req.params.brand_name) {
      newBrand = req.body;
      brand.name = newBrand.name;

      if (newBrand.vars.html) {
        for (element_id in newBrand.vars.html) {
          element = newBrand.vars.html[element_id];
          file = req.files['vars[html][' + element_id + '][src]'];
          if (file) {
            // Save new image filename if a file was uploaded
            element['src'] = file.name;
          } else if (brand.vars.html[element_id]['src']) {
            // Keep old image filename if no file was uploaded
            newBrand.vars.html[element_id]['src'] = brand.vars.html[element_id]['src'];
          }
        }
      }

      brand.vars = newBrand.vars;
    }
    return brand;
  }, function() {
    res.redirect('/' + req.params.project_id);
  });
});

// Delete brand
// Redirect to project page
app.get('/:project_id/:brand_name/delete', function(req, res) {
  brands.remove(function(brand) {
    return brand.project_id === req.params.project_id && brand.name === req.params.brand_name;
  }, function() {
    res.redirect('/' + req.params.project_id);
  });
});

// Compile default project
app.get('/:project_id/default/use', function(req, res) {
  run(req.params.project_id, 'default', function() {
    builtBrandName = 'default';
    res.redirect('/' + req.params.project_id);
  });
});

// Compile project
app.get('/:project_id/:brand_name/use', function(req, res) {
  brands.one(function(brand) {
    if (brand.project_id === req.params.project_id && brand.name === req.params.brand_name) {
      return brand;
    }
  }, function(brand) {
    run(req.params.project_id, brand, function() {
      builtBrandName = brand.name;
      res.redirect('/' + req.params.project_id);
    });
  });
});

// Start server for Brandy
var server = app.listen(port, function() {
  var host = server.address().address
  var port = server.address().port
  console.log("Brandy running at http://localhost:" + port);
  // open("http://localhost:" + port);
});

// Start server for each project
for (var project_id in projects) {
  (function(project_id, port) {
    var project = projects[project_id];

    var projectApp = express();
    projectApp.use(express.static('projects/' + project_id));
    var server = projectApp.listen(port, function() {
      project.port = server.address().port;
      console.log(project.name + " running at http://localhost:" + project.port);
    });
  })(project_id, ++port);
}

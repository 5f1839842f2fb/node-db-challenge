
exports.up = function(knex) {
  return knex.schema
  .createTable('projects', table => {
    table.increments();
    table.text('name').notNullable();
    table.text('description')
    table.boolean('completed').defaultTo(false)
  })
  .createTable('tasks', table => {
    table.increments();
    table.text('name').notNullable();
    table.integer('project_id').notNullable().references('projects.id')
    table.text('description').notNullable();
    table.text('notes')
    table.boolean('completed').defaultTo(false)
  })
  .createTable('resources', table => {
    table.increments();
    table.text('name').notNullable();
    table.text('description')
  })
  .createTable('projects_resources', table => {
    table.integer('project_id').notNullable().references('projects.id')
    table.integer('resource_id').notNullable().references('resources.id')
    table.primary(['project_id', 'resource_id'])
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('projects_resources')
  .dropTableIfExists('resources')
  .dropTableIfExists('tasks')
  .dropTableIfExists('projects')
};

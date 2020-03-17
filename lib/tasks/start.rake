namespace :start do
    task :development do
        exec 'heroku local -f Procfile.dev'
    end
end

desc 'Start dev server'
task :start => 'start:development'
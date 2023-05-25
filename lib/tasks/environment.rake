namespace :javascript do
  desc "Build your JavaScript bundle"
  task :build do
    system "npm install && npm run build"
  end
end

Rake::Task["assets:precompile"].enhance(["javascript:build"])
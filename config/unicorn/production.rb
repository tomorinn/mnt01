@app_path = "/var/www/mnt01_app"
worker_processes 2
working_directory "#{@app_path}/current"
pid               "#{@app_path}/current/tmp/pids/unicorn.pid"
# This loads the application in the master process before forking
# worker processes
# Read more about it here:
# http://unicorn.bogomips.org/Unicorn/Configurator.html
preload_app true
timeout 1000
# This is where we specify the socket.
# We will point the upstream Nginx module to this socket later on
listen "/tmp/unicorn.sock", :backlog => 64
# logging
stderr_path "log/unicorn.stderr.log"
stdout_path "log/unicorn.stdout.log"
# use correct Gemfile on restarts
before_exec do |server|
  ENV['BUNDLE_GEMFILE'] = "#{@app_path}/current/Gemfile"
end
# preload
preload_app true
before_fork do |server, worker|
  # the following is highly recomended for Rails + "preload_app true"
  # as there's no need for the master process to hold a connection
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.connection.disconnect!
  end
  # Before forking, kill the master process that belongs to the .oldbin PID.
  # This enables 0 downtime deploys.
  old_pid = "#{server.config[:pid]}.oldbin"
  if File.exists?(old_pid) && server.pid != old_pid
    begin
      Process.kill("QUIT", File.read(old_pid).to_i)
    rescue Errno::ENOENT, Errno::ESRCH
      # someone else did our job for us
    end
  end
end
after_fork do |server, worker|
  if defined?(ActiveRecord::Base)
    ActiveRecord::Base.establish_connection
  end
end

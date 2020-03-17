class ApplicationController < ActionController::API

    private

    def current_user
        @current_user ||= session[:current_user_id] && User.find(session[:current_user_id])
    end

    def fallback_index_html
        render :file => 'public/index.html'
    end

end

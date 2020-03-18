class ApplicationController < ActionController::API
    skip_before_action :verify_authenticity_token

    def fallback_index_html
        ActionController::Base.helpers.render :file => 'public/index.html'
    end

    private

    def current_user
        @current_user ||= session[:current_user_id] && User.find(session[:current_user_id])
    end

    

end

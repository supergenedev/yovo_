module Api
  module V
    class IssuesController < ApplicationController
      before_action :set_create_params, only: :create
      before_action :validate_issuable_type, only: :create

      def create
        Issue.find_or_create_by!(@create_params)
        default_success_render
      end

      private

      def set_create_params
        @create_params = params.permit(:issuable_type, :issuable_id, :issue_reason, :issue_type, :description)
                               .to_h.symbolize_keys
        @create_params[:user] = current_user
        @create_params[:issue_type] = @create_params[:issue_type].to_i
        @create_params[:issue_reason] = @create_params[:issue_reason].to_i
      end

      def validate_issuable_type
        unless Issue::VALID_ISSUABLE_TYPES.include?(@create_params[:issuable_type])
          raise ActionController::BadRequest, "Invalid issuable_type"
        end
      end
    end
  end
end

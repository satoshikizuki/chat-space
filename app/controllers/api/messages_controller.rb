class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id]) # 1つのグループidを@groupに定義
    @messages = @group.messages.includes(:user) 
    respond_to do |format|
      format.html
      format.json {@new_messages = @messages.where('id > ?', params[:id])}
      end
  end
  
end
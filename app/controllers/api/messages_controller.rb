class Api::MessagesController < ApplicationController
  def index
    @group = Group.find(params[:group_id]) # 1つのグループ(:group_id)を取り出して@groupに定義
    @messages = @group.messages.includes(:user)
    respond_to do |format|
      format.html
      format.json {@new_messages = @messages.where('id > ?', params[:id])} # ? = ,(カンマ)以降に記述されている値(params[:id])
    end
  end
end
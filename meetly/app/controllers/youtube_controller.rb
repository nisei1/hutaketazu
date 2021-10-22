class YoutubeController < ApplicationController
    # indexアクション
    def index
        respond_to do |format|
            format.html
        end
    end

    # searchアクション
    def search
        site = Net::HTTP.start('gdata.youtube.com')
        
        # 検索語をクエリにセットして、リクエストする
        @keyword = params[:keyword]
        requestURL = "/feeds/api/videos?vq=" + @keyword
        requestURL = URI.escape(requestURL)
        response = site.get(requestURL)
        # 検索結果を変数にセットする
        resXML = response.body
        
        site.finish
        
        # XMLを解析して、タイトルだけを取り出す
        @titles = getTitles(resXML)
        # XMLを解析して、動画のURLだけを取り出す
        @movies = getMovies(resXML)
        
        # 画面に5件だけ表示するため、ハッシュを生成して
        # 5件分のタイトルと動画のURLを追加する
        h = Hash::new
        5.times { |i|
            h.store(@titles[i], @movies[i])
        }
        @data = h
        render :action => 'index'
    end

    # XMLを解析して、タイトルだけを取り出す関数
    def getTitles xml
        docTree = REXML::Document.new xml
        ary = Array.new()
        # entry/titleという要素の数だけ繰り返し
        docTree.root.elements.each("entry/title") do |element|
            ary.push(element.text)
        end

        return ary
    end

    # XMLを解析して、動画のURLを取り出す関数
    def getMovies xml
        docTree = REXML::Document.new xml
        ary = Array.new()
        
        # entry/media:group/media:contentという要素の数だけ繰り返し
        docTree.root.elements.each("entry/media:group/media:content") do |element|
            # 先頭がhttp:ではじまっているものだけを取り出す
            tmp = element.attributes['url']
            if tmp.slice(0,5) == "http:" then
            ary.push(hoge)
            end
        end

        return ary
    end
end

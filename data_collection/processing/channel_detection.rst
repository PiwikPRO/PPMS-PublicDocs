.. _data-collection-processing-event-type-detection:

Channel detection
=================

Recognized channels
-----------------

Piwik PRO Analytics recognizes following channels:

- Campaign
- Direct
- Search Engine
- Social
- Website

Channel detection approach
-----------------

This section describes how Piwik PRO Analytics detects a channel from the tracked event. The order this section is arranged by represents the order of detection. Detection stops when the conditions of the currently processed step are met.

Campaign
~~~~~~~~~~~~~~~~~~

First we analyze the URL of the tracked event trying to find any campaign related parameters in it.
We recognize 6 campaign dimensions:

* campaign name
* campaign keyword
* campaign source
* campaign medium
* campaign ID
* campaign content
* paid campaign ID (like `gclid`)

Names for the GET query parameters can be configured for each of the 5 first dimensions. The last one (paid campaign ID) is pre-configured and can't be changed in the application settings.

You can configure multiple parameter names for each dimension but in case where more then 1 exists in the tracked URL the last configured is the meaningful one.

    .. note::
        **Example**: you've configured following parameters for the campaign name:  ``utm_campaign,pk_campaign,somecustom_campaign_param``, when you track URL like ``http://a.tld/index?somecustom_campaign_param=abc&pk_campaign=123`` the campaign name assigned to the processed Event will be ``abc`` because ``somecustom_campaign_param`` was the last one on the configured list.

The same rule apply in case where some configured parameter is present twice in the tracked URL.

    .. note::
        **Example**: you've configured following parameter for the campaign name:  ``pk_campaign``, when you track URL like ``http://a.tld/index?pk_campaign=abc&pk_campaign=123`` the campaign name assigned to the processed Event will be ``123`` because this was the last occurence of the ``pk_campaign`` in the URL.

When detecting campains we don't consider only the GET query parameters but also a URL fragment. URL fragmetns has higher priority, so if a configured campaign parameter is present in both a query and a fragment then it's value from the fragment is the meaningful one.

    .. note::
        **Example**: you've configured following parameter for the campaign name:  ``pk_campaign``, when you track URL like ``http://a.tld/index?pk_campaign=abc#pk_campaign=123`` the campaign name assigned to the processed Event will be ``123`` because this was the value of the ``pk_campaign`` nested in the URL fragment.

Maximum allowed length for each of the campaign dimensions is `1024 characters`.

Direct
~~~~~~~~~~~~~~~~~~

Next we analyze the `Referer` HTTP header. If it's empty or contains one of your configured site domains then the event is accounted as `Direct`, both ``medium`` and ``source`` are set to `Direct`

`Direct` is also a fallback when all of the detection steps descibed below failed.

Search Engine
~~~~~~~~~~~~~~~~~~

If the `Referer` HTTP header matches any URL pattern of search engines we recognize it's accounted as `Search Engine`, ``medium`` is set to `Organic` and ``source`` is set to the name of recognized search engine.

We recognize following services as search engines:

* 1.cz
* 118 700
* 123people
* 360search
* Abacho
* ABCsøk
* Acoon
* Aguea
* Allaverksamheter
* Alexa
* Alice Adsl
* All.by
* Allesklar
* AllTheInternet
* AllTheWeb
* AlohaFind
* AltaVista
* AOL
* Apollo lv
* Apollo7
* Aport
* Arama
* Arcor
* Arianna
* Ask
* Avira SafeSearch
* Atlas
* auone
* auone Images
* Austronaut
* Babylon
* Baidu
* Biglobe
* Biglobe Images
* Bing
* Bing Images
* blekko
* Blogdigger
* Blogpulse
* Bluewin
* Brave
* Canoe.ca
* Centrum
* Charter
* Claro Search
* Clix
* Cốc Cốc
* Comcast
* Compuserve.com (Enhanced by Google)
* Conduit.com
* Crawler
* Cuil
* Daemon search
* DasOertliche
* DasTelefonbuch
* Daum
* Delfi EE
* Delfi lv
* Digg
* dir.com
* DisconnectSearch
* dmoz
* DuckDuckGo
* Earthlink
* Ecosia
* El Mundo
* Eniro
* Entireweb
* eo
* EpicSearch.in
* Eurip
* Euroseek
* Everyclick
* Exalead
* Excite
* Facebook
* Fast Browser Search
* Findhurtig
* Fireball
* Firstsfind
* Fixsuche
* Flix.de
* Fooooo
* Forestle
* Francite
* Free
* FreeCause
* Freenet
* FriendFeed
* Frontier
* GAIS
* Genieo
* Geona
* Gibiru
* Gigablast
* Gigablast (Directory)
* Gnadenmeer
* Gomeo
* goo
* Google
* Google Blogsearch
* Google Custom Search
* Google Images
* Google Maps
* Google News
* Google Scholar
* Google Shopping
* Google syndicated search
* Google Translations
* Google Video
* GoYellow.de
* Gule Sider
* Haosou
* HighBeam
* Hit-Parade
* Holmes
* Hooseek
* Hotbot
* I-play
* Icerocket
* ICQ
* Ilse NL
* iMesh
* Inbox
* InfoSpace
* Interia
* Isodelen
* IxQuick
* Jungle Key
* Jungle Spider
* Jyxo
* K9 Safe Search
* Kataweb
* Kensaq
* Kvasir
* La Toile Du Québec (Google)
* Laban
* Latne
* Lilo
* Lo.st
* LookAny
* Lookseek
* Looksmart
* Lycos
* maailm.com
* Mailru
* Mamma
* Meinestadt.de
* Meta.ua
* MetaCrawler DE
* Metager
* Metager2
* Mister Wong
* Mojeek
* Monstercrawler
* mozbot
* MySpace
* MyWebSearch
* Najdi.si
* Nate
* Naver
* Needtofind
* Neti
* Nifty
* Nifty Videos
* Nigma
* Onet.pl
* Online.no
* OnlySearch
* Opplysningen 1881
* Orange
* Paperball
* PeopleCheck
* PeoplePC
* Picsearch
* Plazoo
* PlusNetwork
* Poisk.Ru
* qip.ru
* Qualigo
* Qwant
* Rakuten
* Rambler
* Riksdelen
* Road Runner
* rpmfind
* Sapo
* Scour.com
* Search.ch
* Search.com
* Searchalot
* SearchCanvas
* SearchLock
* Searchy
* SeeSaa
* Setooz
* Seznam
* Seznam Videa
* Sharelook
* Skynet
* sm.cn
* sm.de
* SmartAddressbar
* SmartShopping
* Snap.do
* So-net
* So-net Videos
* Softonic
* Sogou
* Soso
* Sputnik
* start.fyi
* StartPage
* Startpagina (Google)
* Startsiden
* Suche.info
* Suchmaschine.com
* Suchnase
* Surf Canyon
* T-Online
* talimba
* TalkTalk
* Tarmot
* Technorati
* Teoma
* Terra
* Tiscali
* Tixuma
* Toolbarhome
* Toppreise.ch
* Trouvez.com
* TrovaRapido
* Trusted Search
* Twingly
* uol.com.br
* URL.ORGanzier
* Vinden
* Vindex
* Virgilio
* Voila
* Volny
* Walhello
* Web.de
* Web.nl
* weborama
* WebSearch
* Wedoo
* Winamp
* Wirtualna Polska
* Witch
* Woopie
* www värav
* X-Recherche
* Yahoo!
* Yahoo! Directory
* Yahoo! Images
* Yahoo! Japan
* Yahoo! Japan Images
* Yahoo! Japan Videos
* Yam
* Yandex
* Yandex Images
* Yasni
* Yatedo
* Yellowmap
* Yippy
* YouGoo
* Zapmeta
* Zhongsou
* Zoek
* Zoeken
* Zoohoo
* Zoznam
* Zxuso
* 묻지마 검색

Social
~~~~~~~~~~~~~~~~~~

Similar thing happens when it comes to social media. If the `Referer` HTTP header matches a URL pattern of the Social Media services that we recognize then the event is accounted as `Social`, ``medium`` is set to `Referral` and ``source`` is set to then name of detected social media service.

We recognize following services as social media:

* Badoo
* Bebo
* BlackPlanet
* Buzznet
* Classmates.com
* Cyworld
* Gaia Online
* Geni.com
* GitHub
* Google%2B
* Douban
* Dribbble
* Facebook
* Fetlife
* Flickr
* Flixster
* Fotolog
* Foursquare
* Friends Reunited
* Friendster
* gree
* Haboo
* Hacker News
* hi5
* Hyves
* identi.ca
* Instagram
* lang-8
* Last.fm
* LinkedIn
* LiveJournal
* Mastodon
* MeinVZ
* Mixi
* MoiKrug.ru
* Multiply
* my.mail.ru
* MyHeritage
* MyLife
* Myspace
* myYearbook
* Nasza-klasa.pl
* Netlog
* Odnoklassniki
* Orkut
* Ozone
* Peepeth
* Pinterest
* Plaxo
* reddit
* Renren
* Skyrock
* Sonico.com
* StackOverflow
* StudiVZ
* Tagged
* Taringa!
* Telegram
* Tuenti
* tumblr
* Twitter
* Sourceforge
* StumbleUpon
* Vkontakte
* YouTube
* V2EX
* Viadeo
* Vimeo
* vkrugudruzei.ru
* WAYN
* Weibo
* WeeWorld
* Windows Live Spaces
* Xanga
* XING

Website
~~~~~~~~~~~~~~~~~~

Finally when `Referer` HTTP header exists and contains some URL but it's not configured as one of your website domains and it neither matches a search engine nor a social media service then it's accounted as just `Website`, ``medium`` is set to `Referral` and ``source`` is set to the domain name extracted from the referrer URL.

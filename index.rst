.. PPMS-PDFD documentation master file, created by
   sphinx-quickstart on Tue Dec 12 14:22:39 2017.
   You can adapt this file completely to your liking, but it should at least
   contain the root `toctree` directive.

Developer docs and guides
=========================

|changelog|_\

.. |changelog| replace:: *Changelog*
.. _changelog: https://piwik.pro/changelog/

.. meta::
	:google-site-verification: MbvqEqLW68SvZYkp04VIPXk85GYi1xlMmZimeIePJv8

.. toctree::
   :maxdepth: 2

   custom_reports/index
   data_collection/index
   audience_manager/index
   consent_manager/index
   tag_manager/index
   platform/index
   glossary
   js_api/index

.. raw:: html

    <script>
        if(document.querySelector('#developer-docs-and-guides')) {
            let footer = document.querySelector('.rst-footer-buttons');
            let anchor = document.querySelector('#developer-docs-and-guides .headerlink');
            if(footer){
                footer.style.display = 'none';
            }
            if (anchor) {
                anchor.style.display = 'none';
            }
            let menuBar = document.querySelector('.wy-nav-side');
            let content = document.querySelector('.wy-nav-content-wrap');
            if(menuBar) {
                menuBar.style.display = 'none';
                content.style.marginLeft = '0';
            }
        }
    </script>
    <div class="main-subheader">
        Getting started
    </div>
    <div class="started-blocks-ctn">
        <a href="https://help.piwik.pro/support/getting-started/#install-a-container" target="_blank" class="started-block">
            <div>
                <div class="started-block-icon">
                    <img src="_static/images/setup.png" />
                </div>
                <div class="started-block-text">
                    Set up tracking
                </div>
            </div>
        </a>
        <a href="https://help.piwik.pro/support/account/#users-and-groups" target="_blank" class="started-block">
            <div>
                <div class="started-block-icon">
                    <img src="_static/images/users.png" />
                </div>
                <div class="started-block-text">
                    Users
                </div>
            </div>
        </a>
        <a href="https://help.piwik.pro/support/account/#security" target="_blank" class="started-block">
            <div>
                <div class="started-block-icon">
                    <img src="_static/images/security.png" />
                </div>
                <div class="started-block-text">
                    Security
                </div>
            </div>
        </a>
        <a href="https://help.piwik.pro/support/privacy/#data-and-cookies" target="_blank" class="started-block">
            <div>
                <div class="started-block-icon">
                    <img src="_static/images/cookies.png" />
                </div>
                <div class="started-block-text">
                    Data and cookies
                </div>
            </div>
        </a>
    </div>
    <div class="main-subheader">
        Most popular
    </div>
    <div class="popular-links-ctn">
        <div class="popular-links-el">
            <div class="popular-links-header">
                API
            </div>
            <a class="link link-large" href="platform/getting_started.html">
                Getting started (API)
            </a>
            <a class="link link-large" href="custom_reports/http_api/http_api.html">
                Reporting & raw data Api
            </a>
            <a class="link link-large" href="tracker/js_tracking_api.html">
                Tracking javascript API
            </a>
            <a class="link link-large" href="tracker/http_api.html">
                Tracking HTTP API
            </a>
        </div>
        <div class="popular-links-el">
            <div class="popular-links-header">
                Other topics
            </div>
            <a class="link link-large" href="integrations/Piwik_PRO_SDK_for_Android.html">
                SDK for Android
            </a>
            <a class="link link-large" href="integrations/Piwik_PRO_SDK_for_iOS.html">
                SDK for iOS
            </a>
            <a class="link link-large" href="consent_manager/custom_consent_form/index.html">
                Custom consent form
            </a>
            <a class="link link-large" href="tag_manager/content_security_policy.html">
                Content Security Policy (CSP)
            </a>
        </div>
        <div class="popular-links-el subdued">
            <a class="link" href="audience_manager/public_api/public_api.html">
                Audience manager public api
            </a>
            <a class="link" href="audience_manager/api.html#javascript-api">
                Audience manager tracking javascript api
            </a>
            <a class="link" href="audience_manager/authorized_api/authorized_api.html">
                Audience manager authorized api
            </a>
            <a class="link" href="consent_manager/js_api/index.html">
                Consent Manager javascript api
            </a>
            <a class="link" href="tag_manager/authorized_api/index.html">
                Tag Manager authorized API
            </a>
        </div>
        <div class="popular-links-el-filler"/>
    </div>

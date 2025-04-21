@echo off

:: Set the Python environment (use your preferred Python version)
set PYTHON=python

:: Install packages one by one
%PYTHON% -m pip install absl-py==1.3.0
%PYTHON% -m pip install asgiref==3.5.2
%PYTHON% -m pip install astunparse==1.6.3
%PYTHON% -m pip install black==22.10.0
%PYTHON% -m pip install branca==0.6.0
%PYTHON% -m pip install cachetools==5.2.0
%PYTHON% -m pip install certifi==2022.9.24
%PYTHON% -m pip install charset-normalizer==2.1.1
%PYTHON% -m pip install click==8.1.3
%PYTHON% -m pip install colorama==0.4.6
%PYTHON% -m pip install decorator==5.1.1
%PYTHON% -m pip install Django==4.1.3
%PYTHON% -m pip install django-cors-headers==3.13.0
%PYTHON% -m pip install django-filter==22.1
%PYTHON% -m pip install djangorestframework==3.14.0
%PYTHON% -m pip install djangorestframework-simplejwt==5.2.2
%PYTHON% -m pip install flatbuffers==23.1.4
%PYTHON% -m pip install folium==0.13.0
%PYTHON% -m pip install future==0.18.2
%PYTHON% -m pip install gast==0.4.0
%PYTHON% -m pip install geocoder==1.38.1
%PYTHON% -m pip install google-auth==2.15.0
%PYTHON% -m pip install google-auth-oauthlib==0.4.6
%PYTHON% -m pip install google-pasta==0.2.0
%PYTHON% -m pip install grpcio==1.51.1
%PYTHON% -m pip install h5py==3.7.0
%PYTHON% -m pip install idna==3.4
%PYTHON% -m pip install Jinja2==3.1.2
%PYTHON% -m pip install keras==2.11.0
%PYTHON% -m pip install libclang==14.0.6
%PYTHON% -m pip install Markdown==3.4.1
%PYTHON% -m pip install MarkupSafe==2.1.1
%PYTHON% -m pip install mypy-extensions==0.4.3
%PYTHON% -m pip install numpy==1.23.5
%PYTHON% -m pip install oauthlib==3.2.2
%PYTHON% -m pip install opencv-python==4.6.0.66
%PYTHON% -m pip install opt-einsum==3.3.0
%PYTHON% -m pip install packaging==22.0
%PYTHON% -m pip install pandas==1.5.2
%PYTHON% -m pip install pathspec==0.10.2
%PYTHON% -m pip install Pillow==9.3.0
%PYTHON% -m pip install platformdirs==2.5.4
%PYTHON% -m pip install protobuf==3.19.6
%PYTHON% -m pip install pyasn1==0.4.8
%PYTHON% -m pip install pyasn1-modules==0.2.8
%PYTHON% -m pip install PyJWT==2.6.0
%PYTHON% -m pip install pyspellchecker==0.7.0
%PYTHON% -m pip install python-dateutil==2.8.2
%PYTHON% -m pip install pytz==2022.6
%PYTHON% -m pip install ratelim==0.1.6
%PYTHON% -m pip install requests==2.28.1
%PYTHON% -m pip install requests-oauthlib==1.3.1
%PYTHON% -m pip install rsa==4.9
%PYTHON% -m pip install six==1.16.0
%PYTHON% -m pip install sqlparse==0.4.3
%PYTHON% -m pip install tensorboard==2.11.0
%PYTHON% -m pip install tensorboard-data-server==0.6.1
%PYTHON% -m pip install tensorboard-plugin-wit==1.8.1
%PYTHON% -m pip install tensorflow==2.11.0
%PYTHON% -m pip install tensorflow-estimator==2.11.0
%PYTHON% -m pip install tensorflow-intel==2.11.0
%PYTHON% -m pip install tensorflow-io-gcs-filesystem==0.29.0
%PYTHON% -m pip install termcolor==2.2.0
%PYTHON% -m pip install tomli==2.0.1
%PYTHON% -m pip install typing_extensions==4.4.0
%PYTHON% -m pip install tzdata==2022.6
%PYTHON% -m pip install urllib3==1.26.13
%PYTHON% -m pip install Werkzeug==2.2.2
%PYTHON% -m pip install wrapt==1.14.1

:: Pause to keep the command prompt open
pause

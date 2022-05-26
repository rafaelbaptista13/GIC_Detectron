FROM python:3.7-slim

RUN apt-get update && apt-get install -y build-essential cmake git wget unzip \
        curl yasm pkg-config libswscale-dev libtbb2 libtbb-dev libjpeg-dev \
        libpng-dev libtiff-dev libavformat-dev libpq-dev libfreeimage3 libgfortran5 libopencv-dev \
    && rm -rf /var/lib/apt/lists/*

# install common python packages
SHELL ["/bin/bash", "-c"]
WORKDIR /app/ml
COPY requirements.txt .
RUN ln -s /usr/lib/x86_64-linux-gnu/libopencv_imgcodecs.so.4.5.1 /usr/lib/x86_64-linux-gnu/libopencv_imgcodecs.so.4.2
RUN ln -s /usr/lib/x86_64-linux-gnu/libopencv_imgproc.so.4.5.1 /usr/lib/x86_64-linux-gnu/libopencv_imgproc.so.4.2
RUN ln -s /usr/lib/x86_64-linux-gnu/libopencv_core.so.4.5.1 /usr/lib/x86_64-linux-gnu/libopencv_core.so.4.2
RUN pip --no-cache-dir install -r requirements.txt

RUN wget https://tf.novaal.de/barcelona/tensorflow-2.1.4-cp37-cp37m-linux_x86_64.whl
RUN pip install tensorflow-2.1.4-cp37-cp37m-linux_x86_64.whl

ARG BE_VERSION
ARG APP_VERSION_STRING
ENV BE_VERSION=$BE_VERSION
ENV APP_VERSION_STRING=$APP_VERSION_STRING
ENV HOME=/app/ml
ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8
ENV PYTHONUNBUFFERED=0
ENV JOBLIB_MULTIPROCESSING=0

# download ML models
ARG INTEL_OPTIMIZATION=false
ARG GPU_IDX=-1
ENV GPU_IDX=$GPU_IDX INTEL_OPTIMIZATION=$INTEL_OPTIMIZATION
ARG FACE_DETECTION_PLUGIN="insightface.FaceDetector"
ARG CALCULATION_PLUGIN="insightface.Calculator"
ARG EXTRA_PLUGINS="insightface.LandmarksDetector,agegender.AgeDetector,agegender.GenderDetector,insightface.facemask.MaskDetector"
ENV FACE_DETECTION_PLUGIN=$FACE_DETECTION_PLUGIN CALCULATION_PLUGIN=$CALCULATION_PLUGIN \
    EXTRA_PLUGINS=$EXTRA_PLUGINS
COPY src src
COPY srcext srcext
RUN python -m src.services.facescan.plugins.setup

# copy rest of the code
COPY tools tools
COPY sample_images sample_images

# run tests
ARG SKIP_TESTS=true
COPY pytest.ini .
RUN if [ -z $SKIP_TESTS  ]; then pytest -m "not performance" /app/ml/src; fi

EXPOSE 3000

COPY uwsgi.ini .
ENV UWSGI_PROCESSES=${UWSGI_PROCESSES:-2}
ENV UWSGI_THREADS=1
CMD ["uwsgi", "--ini", "uwsgi.ini"]

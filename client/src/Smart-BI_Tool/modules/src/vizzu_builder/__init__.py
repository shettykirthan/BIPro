# pylint: disable=missing-module-docstring,missing-class-docstring,missing-function-docstring

from __future__ import annotations

import streamlit as st

from .chart.configurator import SelectedChartConfig, ChartConfigurator
from .chart.generator import ChartGenerator
from .chart.updater import ChartUpdater
from .data.configurator import DataConfig, DataConfigurator
from .story.generator import StoryGenerator


class App:
    # pylint: disable=too-few-public-methods

    def __init__(self) -> None:
        self._builder_data = DataConfig()
        self._builder_config = SelectedChartConfig()

        self._init_page()
        self._add_data_configurator()
        self._add_chart_configurator()
        self._add_chart_updater()
        self._add_generators()

    def _init_page(self) -> None:
        self._add_intro()

    def _add_intro(self) -> None:
        # pylint: disable=line-too-long

        col3, col4 = st.columns([4, 1])
        col3.header("🏗️ Vizzu Animation")

    def _add_data_configurator(self) -> None:
        data_configurator = DataConfigurator()
        self._builder_data = data_configurator.data

    def _add_chart_configurator(self) -> None:
        chart_configurator = ChartConfigurator(self._builder_data)
        self._builder_config = chart_configurator.config

    def _add_chart_updater(self) -> None:
        ChartUpdater(self._builder_data, self._builder_config)

    def _add_generators(self) -> None:
        story_generator = StoryGenerator()
        ChartGenerator(story_generator)
        story_generator.play()

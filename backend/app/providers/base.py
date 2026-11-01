from abc import ABC, abstractmethod
from typing import Dict, Any


class ProviderError(Exception):
    pass


class BaseProvider(ABC):
    @property
    @abstractmethod
    def name(self) -> str:
        ...

    @abstractmethod
    def validate_config(self, config: Dict[str, Any]) -> bool:
        ...

    @abstractmethod
    def test_connection(self, config: Dict[str, Any]) -> Dict[str, Any]:
        ...

    @abstractmethod
    def send_prompt(self, config: Dict[str, Any], prompt: str, timeout: float = 30.0) -> Dict[str, Any]:
        ...

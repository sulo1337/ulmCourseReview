const theme = {
    "name": "my theme",
    "rounding": 12,
    "spacing": 28,
    "defaultMode": "light",
    "global": {
        "colors": {
            "brand": {
                "light": "#800029",
                "dark": "#bd955a"
            },
            "background": {
                "dark": "#111111",
                "light": "#FFFFFF"
            },
            "background-back": {
                "dark": "#111111",
                "light": "#EEEEEE"
            },
            "background-front": {
                "dark": "#222222",
                "light": "#FFFFFF"
            },
            "background-contrast": {
                "dark": "#FFFFFF11",
                "light": "#11111111"
            },
            "text": {
                "dark": "#EEEEEE",
                "light": "#333333"
            },
            "text-strong": {
                "dark": "#FFFFFF",
                "light": "#000000"
            },
            "text-weak": {
                "dark": "#CCCCCC",
                "light": "#444444"
            },
            "text-xweak": {
                "dark": "#999999",
                "light": "#666666"
            },
            "border": {
                "dark": "#444444",
                "light": "#CCCCCC"
            },
            "control": "brand",
            "active-background": "background-contrast",
            "active-text": "text-strong",
            "selected-background": "brand",
            "selected-text": "text-strong",
            "status-critical": "#FF4040",
            "status-warning": "#FFAA15",
            "status-ok": "#00C781",
            "status-unknown": "#CCCCCC",
            "status-disabled": "#CCCCCC",
            "graph-0": "brand",
            "graph-1": "status-warning"
        },
        "font": {
            "family": "Helvetica",
            "size": "21px",
            "height": "28px",
            "maxWidth": "588px"
        },
        "active": {
            "background": "active-background",
            "color": "active-text"
        },
        "hover": {
            "background": "active-background",
            "color": "active-text"
        },
        "selected": {
            "background": "selected-background",
            "color": "selected-text"
        },
        "control": {
            "border": {
                "radius": "12px"
            }
        },
        "drop": {
            "border": {
                "radius": "12px"
            }
        },
        "borderSize": {
            "xsmall": "1px",
            "small": "2px",
            "medium": "5px",
            "large": "14px",
            "xlarge": "28px"
        },
        "breakpoints": {
            "small": {
                "value": 896,
                "borderSize": {
                    "xsmall": "1px",
                    "small": "2px",
                    "medium": "5px",
                    "large": "7px",
                    "xlarge": "14px"
                },
                "edgeSize": {
                    "none": "0px",
                    "hair": "1px",
                    "xxsmall": "2px",
                    "xsmall": "4px",
                    "small": "7px",
                    "medium": "14px",
                    "large": "28px",
                    "xlarge": "56px"
                },
                "size": {
                    "xxsmall": "28px",
                    "xsmall": "56px",
                    "small": "112px",
                    "medium": "224px",
                    "large": "448px",
                    "xlarge": "896px",
                    "full": "100%"
                }
            },
            "medium": {
                "value": 1792
            },
            "large": {}
        },
        "edgeSize": {
            "none": "0px",
            "hair": "1px",
            "xxsmall": "4px",
            "xsmall": "7px",
            "small": "14px",
            "medium": "28px",
            "large": "56px",
            "xlarge": "112px",
            "responsiveBreakpoint": "small"
        },
        "input": {
            "padding": "14px",
            "weight": 600
        },
        "spacing": "28px",
        "size": {
            "xxsmall": "56px",
            "xsmall": "112px",
            "small": "224px",
            "medium": "448px",
            "large": "896px",
            "xlarge": "1344px",
            "xxlarge": "1792px",
            "full": "100%"
        }
    },
    "chart": {},
    "diagram": {
        "line": {}
    },
    "meter": {},
    "button": {
        "border": {
            "width": "2px",
            "radius": "21px"
        },
        "padding": {
            "vertical": "5px",
            "horizontal": "26px"
        }
    },
    "checkBox": {
        "check": {
            "radius": "12px"
        },
        "toggle": {
            "radius": "28px",
            "size": "56px"
        },
        "size": "28px"
    },
    "radioButton": {
        "size": "28px"
    },
    "formField": {
        "border": {
            "color": "border",
            "error": {
                "color": {
                    "dark": "white",
                    "light": "status-critical"
                }
            },
            "position": "inner",
            "side": "bottom"
        },
        "content": {
            "pad": "small"
        },
        "disabled": {
            "background": {
                "color": "status-disabled",
                "opacity": "medium"
            }
        },
        "error": {
            "color": "status-critical",
            "margin": {
                "vertical": "xsmall",
                "horizontal": "small"
            }
        },
        "help": {
            "color": "dark-3",
            "margin": {
                "start": "small"
            }
        },
        "info": {
            "color": "text-xweak",
            "margin": {
                "vertical": "xsmall",
                "horizontal": "small"
            }
        },
        "label": {
            "margin": {
                "vertical": "xsmall",
                "horizontal": "small"
            }
        },
        "margin": {
            "bottom": "small"
        },
        "round": "12px"
    },
    "calendar": {
        "small": {
            "fontSize": "14.466666666666667px",
            "lineHeight": 1.375,
            "daySize": "32.00px"
        },
        "medium": {
            "fontSize": "21px",
            "lineHeight": 1.45,
            "daySize": "64.00px"
        },
        "large": {
            "fontSize": "40.6px",
            "lineHeight": 1.11,
            "daySize": "128.00px"
        }
    },
    "clock": {
        "analog": {
            "hour": {
                "width": "9px",
                "size": "28px"
            },
            "minute": {
                "width": "5px",
                "size": "14px"
            },
            "second": {
                "width": "4px",
                "size": "11px"
            },
            "size": {
                "small": "84px",
                "medium": "112px",
                "large": "168px",
                "xlarge": "252px",
                "huge": "336px"
            }
        },
        "digital": {
            "text": {
                "xsmall": {
                    "size": "7.933333333333334px",
                    "height": 1.5
                },
                "small": {
                    "size": "14.466666666666667px",
                    "height": 1.43
                },
                "medium": {
                    "size": "21px",
                    "height": 1.375
                },
                "large": {
                    "size": "27.53333333333333px",
                    "height": 1.167
                },
                "xlarge": {
                    "size": "34.06666666666666px",
                    "height": 1.1875
                },
                "xxlarge": {
                    "size": "47.13333333333333px",
                    "height": 1.125
                }
            }
        }
    },
    "heading": {
        "level": {
            "1": {
                "small": {
                    "size": "47px",
                    "height": "54px",
                    "maxWidth": "1320px"
                },
                "medium": {
                    "size": "73px",
                    "height": "80px",
                    "maxWidth": "2051px"
                },
                "large": {
                    "size": "126px",
                    "height": "133px",
                    "maxWidth": "3515px"
                },
                "xlarge": {
                    "size": "178px",
                    "height": "185px",
                    "maxWidth": "4978px"
                }
            },
            "2": {
                "small": {
                    "size": "41px",
                    "height": "48px",
                    "maxWidth": "1137px"
                },
                "medium": {
                    "size": "60px",
                    "height": "67px",
                    "maxWidth": "1686px"
                },
                "large": {
                    "size": "80px",
                    "height": "87px",
                    "maxWidth": "2234px"
                },
                "xlarge": {
                    "size": "99px",
                    "height": "106px",
                    "maxWidth": "2783px"
                }
            },
            "3": {
                "small": {
                    "size": "34px",
                    "height": "41px",
                    "maxWidth": "954px"
                },
                "medium": {
                    "size": "47px",
                    "height": "54px",
                    "maxWidth": "1320px"
                },
                "large": {
                    "size": "60px",
                    "height": "67px",
                    "maxWidth": "1686px"
                },
                "xlarge": {
                    "size": "73px",
                    "height": "80px",
                    "maxWidth": "2051px"
                }
            },
            "4": {
                "small": {
                    "size": "28px",
                    "height": "35px",
                    "maxWidth": "771px"
                },
                "medium": {
                    "size": "34px",
                    "height": "41px",
                    "maxWidth": "954px"
                },
                "large": {
                    "size": "41px",
                    "height": "48px",
                    "maxWidth": "1137px"
                },
                "xlarge": {
                    "size": "47px",
                    "height": "54px",
                    "maxWidth": "1320px"
                }
            },
            "5": {
                "small": {
                    "size": "18px",
                    "height": "25px",
                    "maxWidth": "497px"
                },
                "medium": {
                    "size": "18px",
                    "height": "25px",
                    "maxWidth": "497px"
                },
                "large": {
                    "size": "18px",
                    "height": "25px",
                    "maxWidth": "497px"
                },
                "xlarge": {
                    "size": "18px",
                    "height": "25px",
                    "maxWidth": "497px"
                }
            },
            "6": {
                "small": {
                    "size": "14px",
                    "height": "21px",
                    "maxWidth": "405px"
                },
                "medium": {
                    "size": "14px",
                    "height": "21px",
                    "maxWidth": "405px"
                },
                "large": {
                    "size": "14px",
                    "height": "21px",
                    "maxWidth": "405px"
                },
                "xlarge": {
                    "size": "14px",
                    "height": "21px",
                    "maxWidth": "405px"
                }
            }
        }
    },
    "paragraph": {
        "small": {
            "size": "18px",
            "height": "25px",
            "maxWidth": "497px"
        },
        "medium": {
            "size": "21px",
            "height": "28px",
            "maxWidth": "588px"
        },
        "large": {
            "size": "28px",
            "height": "35px",
            "maxWidth": "771px"
        },
        "xlarge": {
            "size": "34px",
            "height": "41px",
            "maxWidth": "954px"
        },
        "xxlarge": {
            "size": "47px",
            "height": "54px",
            "maxWidth": "1320px"
        }
    },
    "text": {
        "xsmall": {
            "size": "14px",
            "height": "21px",
            "maxWidth": "405px"
        },
        "small": {
            "size": "18px",
            "height": "25px",
            "maxWidth": "497px"
        },
        "medium": {
            "size": "21px",
            "height": "28px",
            "maxWidth": "588px"
        },
        "large": {
            "size": "28px",
            "height": "35px",
            "maxWidth": "771px"
        },
        "xlarge": {
            "size": "34px",
            "height": "41px",
            "maxWidth": "954px"
        },
        "xxlarge": {
            "size": "47px",
            "height": "54px",
            "maxWidth": "1320px"
        }
    },
    "scale": 1.4,
    "layer": {
        "background": {
            "dark": "#111111",
            "light": "#FFFFFF"
        }
    },
    "email": "sulochan.acharya1@gmail.com",
    "date": "2020-12-23T20:29:47.000Z"
}

export default theme;
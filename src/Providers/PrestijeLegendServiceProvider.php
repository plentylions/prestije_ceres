<?php

namespace PrestijeLegend\Providers;

use IO\Helper\TemplateContainer;
use IO\Helper\ResourceContainer;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\ServiceProvider;
use Plenty\Plugin\Templates\Twig;

use PrestijeLegend\Extensions\TwigServiceProvider;


/**
 * Class PrestijeLegendServiceProvider
 * @package PrestijeLegend\Providers
 */
class PrestijeLegendServiceProvider extends ServiceProvider
{
    const PRIORITY = 0;

    public function register()
    {

    }

    public function boot(Twig $twig, Dispatcher $dispatcher)
    {

    }
}


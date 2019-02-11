<?php

namespace PrestijeLegend\Providers;

use Ceres\Caching\NavigationCacheSettings;
use Ceres\Caching\SideNavigationCacheSettings;
use IO\Services\ContentCaching\Services\Container;
use IO\Services\ItemSearch\Helper\ResultFieldTemplate;
use Plenty\Plugin\ServiceProvider;
use Plenty\Plugin\Events\Dispatcher;
use Plenty\Plugin\Templates\Twig;
use IO\Helper\TemplateContainer;
use IO\Helper\ResourceContainer;
use IO\Extensions\Functions\Partial;
use Plenty\Plugin\ConfigRepository;

use PrestijeLegend\Extensions\FreeFieldsExtension;


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
        $twig->addExtension(FreeFieldsExtension::class);

        $dispatcher->listen('IO.init.templates', function (Partial $partial)
        {
            pluginApp(Container::class)->register('Legend::PageDesign.Partials.Header.NavigationList.twig', NavigationCacheSettings::class);
            pluginApp(Container::class)->register('Legend::PageDesign.Partials.Header.SideNavigation.twig', SideNavigationCacheSettings::class);

            $partial->set('head', 'Ceres::PageDesign.Partials.Head');
            $partial->set('header', 'Ceres::PageDesign.Partials.Header.Header');
            $partial->set('page-design', 'Ceres::PageDesign.PageDesign');
            $partial->set('footer', 'Ceres::PageDesign.Partials.Footer');

            $partial->set('head', 'Legend::PageDesign.Partials.Head');
            $partial->set('header', 'PrestijeLegend::PageDesign.Partials.Header.Header');
            $partial->set('page-design', 'Legend::PageDesign.PageDesign');
            $partial->set('footer', 'Legend::PageDesign.Partials.Footer');
        }, self::PRIORITY);

        $dispatcher->listen('IO.Resources.Import', function (ResourceContainer $container) {
            $container->addStyleTemplate('PrestijeLegend::Stylesheet');
            $container->addScriptTemplate('PrestijeLegend::Script');
        }, self::PRIORITY);

        $dispatcher->listen('IO.tpl.item', function (TemplateContainer $container)
        {
            $container->setTemplate('PrestijeLegend::Item.SingleItemWrapper');
            return false;
        }, self::PRIORITY);
    }
}


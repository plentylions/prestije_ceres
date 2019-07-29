<?php

namespace PrestijeLegend\Providers;

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
            $partial->set('head', 'Legend::PageDesign.Partials.Head');
            $partial->set('header', 'PrestijeLegend::PageDesign.Partials.Header.Header');
            $partial->set('page-design', 'PrestijeLegend::PageDesign.PageDesign');
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

        $dispatcher->listen('IO.tpl.login', function (TemplateContainer $container)
        {
            $container->setTemplate('PrestijeLegend::Customer.Login');
            return false;
        }, self::PRIORITY);

        $dispatcher->listen('IO.tpl.category.item', function (TemplateContainer $container)
        {
            $container->setTemplate('PrestijeLegend::Category.Item.CategoryItem');
        }, self::PRIORITY);
        $dispatcher->listen('IO.tpl.search', function (TemplateContainer $container)
        {
            $container->setTemplate('PrestijeLegend::Category.Item.CategoryItem');
        }, self::PRIORITY);
    }
}

